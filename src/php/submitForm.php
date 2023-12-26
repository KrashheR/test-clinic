<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = strip_tags(trim($_POST["firstName"]));
    $lastName = strip_tags(trim($_POST["lastName"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $service = strip_tags(trim($_POST["service"]));

    if (empty($firstName) || empty($lastName) || empty($phone) || empty($service) || !preg_match('/^(\+7|8)[0-9]{10}$/', $phone)) {
        echo "Пожалуйста, заполните форму корректно.";
        exit;
    }

    $recipient = "rbru-metrika@yandex.ru";
    $subject = "Новая заявка от клиента(Тестовое задание Кучеренко Н.С.)";

    $email_content = "Добрый день! Поступила новая заявка от клиента:\n\n";
    $email_content .= "Имя: $firstName\n";
    $email_content .= "Фамилия: $lastName\n";
    $email_content .= "Телефон: $phone\n";
    $email_content .= "Услуга: $service\n\n";
    $email_content .= "Это тестовое задание от кандидата Кучеренко Никиты";

    $email_headers = "MIME-Version: 1.0" . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
    $email_headers .= "From: nikita.kucherencko.ya@yandex.ru" . "\r\n";
    $email_headers .= "Reply-To: nikita.kucherencko.ya@yandex.ru";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "Спасибо! Ваша заявка отправлена.";
    } else {
        echo "Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.";
    }
} else {
    echo "Ошибка: форма не отправлена.";
}
?>
