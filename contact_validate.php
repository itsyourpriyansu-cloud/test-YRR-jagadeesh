<?php
/**
 * Contact form handler for the "Start Your Real Investment" form.
 * Validates input + Google reCAPTCHA, then emails the enquiry.
 */

header('Content-Type: application/json');

// ── Configuration ──────────────────────────────────────────────
$recaptchaSecretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your reCAPTCHA secret key
$recipientEmail     = 'partners@yoshitharealrise.com';

function respond($success, $message = '') {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Invalid request method.');
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');
$captchaResponse = $_POST['g-recaptcha-response'] ?? '';

// ── Basic server-side validation ───────────────────────────────
if ($name === '' || strlen($name) < 2) {
    respond(false, 'Please enter a valid name.');
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

if ($message === '' || strlen($message) < 10) {
    respond(false, 'Please write a brief message.');
}

if ($captchaResponse === '') {
    respond(false, "Please verify that you're not a robot.");
}

// ── Verify reCAPTCHA with Google ───────────────────────────────
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$verifyData = [
    'secret'   => $recaptchaSecretKey,
    'response' => $captchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
];

$ch = curl_init($verifyUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($verifyData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$verifyResult = curl_exec($ch);
curl_close($ch);

$verifyJson = json_decode($verifyResult ?: '', true);

if (empty($verifyJson['success'])) {
    respond(false, 'reCAPTCHA verification failed. Please try again.');
}

// ── Send email ──────────────────────────────────────────────────
$subject = 'New Investment Enquiry from ' . $name;
$body = "You have received a new enquiry via the website contact form.\n\n"
      . "Name: {$name}\n"
      . "Email: {$email}\n"
      . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n\n"
      . "Message:\n{$message}\n";

$headers = "From: no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'yoshitharealrise.com') . "\r\n"
         . "Reply-To: {$email}\r\n";

$mailSent = mail($recipientEmail, $subject, $body, $headers);

if (!$mailSent) {
    respond(false, 'Your message could not be sent right now. Please try again later.');
}

respond(true, 'Your enquiry has been received. Our team will contact you shortly.');
