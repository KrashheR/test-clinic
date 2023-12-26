<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = strip_tags(trim($_POST["firstName"]));
    $lastName = strip_tags(trim($_POST["lastName"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $service = strip_tags(trim($_POST["service"]));

    // Проверка данных
    if (empty($firstName) || empty($lastName) || empty($phone) || empty($service) || !preg_match('/^(\+7|8)[0-9]{10}$/', $phone)) {
        // Обработка ошибки, данные некорректны
        echo "Пожалуйста, заполните форму корректно.";
        exit;
    }

    $recipient = "nikita.kucherencko.ya@yandex.ru";
    $subject = "Новая заявка с сайта";

    $email_content = "Имя: $firstName\n";
    $email_content .= "Фамилия: $lastName\n";
    $email_content .= "Телефон: $phone\n";
    $email_content .= "Услуга: $service\n";

    $email_headers = "From: <ваш-email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "Спасибо! Ваша заявка отправлена.";
    } else {
        echo "Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.";
    }
} else {
    echo "Ошибка: форма не отправлена.";
}
?>