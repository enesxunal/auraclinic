<?php
/**
 * Aura Clinic — Lead notification (PHP mail)
 * Recipient: info@auraclinicge.com
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

function h($s) {
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$lang = isset($_POST['lang']) ? preg_replace('/[^a-z]/i', '', $_POST['lang']) : 'en';
if (strlen($lang) > 5) {
    $lang = 'en';
}

$protocolId = isset($_POST['protocol_id']) ? trim($_POST['protocol_id']) : '';
$recommendation = isset($_POST['recommendation']) ? trim($_POST['recommendation']) : '';
$graftRange = isset($_POST['graft_range']) ? trim($_POST['graft_range']) : '';
$recovery = isset($_POST['recovery']) ? trim($_POST['recovery']) : '';
$answersJson = isset($_POST['answers_json']) ? $_POST['answers_json'] : '';

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_input']);
    exit;
}

$answers = json_decode($answersJson, true);
if (!is_array($answers)) {
    $answers = [];
}

$to = 'info@auraclinicge.com';
$subject = 'Aura Clinic Lead — Protocol ' . h($protocolId);

$rows = '';
foreach ($answers as $key => $val) {
    $rows .= '<tr><td style="padding:8px;border:1px solid #ddd;"><strong>' . h($key) . '</strong></td><td style="padding:8px;border:1px solid #ddd;">' . h($val) . '</td></tr>';
}

$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:Montserrat,Segoe UI,sans-serif;font-size:14px;color:#424240;line-height:1.5;">';
$body .= '<h2 style="color:#8a919c;">New enquiry — Aura Clinic</h2>';
$body .= '<p><strong>Contact</strong></p><ul>';
$body .= '<li>Name: ' . h($name) . '</li>';
$body .= '<li>Email: <a href="mailto:' . h($email) . '">' . h($email) . '</a></li>';
$body .= '<li>Phone: ' . h($phone) . '</li>';
$body .= '<li>Form language: ' . h($lang) . '</li>';
$body .= '</ul>';

$body .= '<p><strong>Protocol ID</strong><br>' . h($protocolId) . '</p>';
$body .= '<p><strong>Recommendation / protocol</strong></p><pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">' . h($recommendation) . '</pre>';
$body .= '<p><strong>Grafts (range)</strong> ' . h($graftRange) . '</p>';
$body .= '<p><strong>Recovery</strong> ' . h($recovery) . '</p>';

if ($rows !== '') {
    $body .= '<p><strong>Analysis answers</strong></p><table style="border-collapse:collapse;width:100%;max-width:560px;">' . $rows . '</table>';
}

$body .= '<p style="color:#888;font-size:12px;margin-top:24px;">Sent via auraclinicge.com contact form.</p>';
$body .= '</body></html>';

$fromAddr = 'noreply@auraclinicge.com';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Aura Clinic Website <' . $fromAddr . '>';
$headers[] = 'Reply-To: ' . $email;

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if ($ok) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail_failed']);
}
