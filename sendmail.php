<?php
    use PHPMAiler\PHPMAiler\PHPMAiler;
    use PHPMAiler\PHPMAiler\Exeption;

    require 'PHPMailer/src/Exeption.php';
    require 'PHPMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru','PHPMailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('private1999pyle@gmail.com', 'Submit' );
    $mail->addAddress('serj.ermolenko.1861@gmail.com');
    $mail->Subject = "Chiki-Briki";

    $body = '<h1>Letter!</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p';
    }
    if(trim(!empty($_POST['Email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['Email'].'</p';
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Phone number:</strong> '.$_POST['phone'].'</p';
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Error';
    }
    else {
        $message = 'Information sent';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>