<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize form inputs
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Your email address (the one that will receive the enquiry)
    $to = "info.anumah@gmail.com";  // 🔥 Replace with your email

    $subject = "New Enquiry Received";

    // Email content
    $body = "
    <h2>New Enquiry Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Message:</strong><br>$message</p>
    ";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $name <$email>" . "\r\n";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('✅ Your enquiry has been sent successfully!'); window.history.back();</script>";
    } else {
        echo "<script>alert('❌ Failed to send your enquiry. Please try again later.'); window.history.back();</script>";
    }
}
?>
