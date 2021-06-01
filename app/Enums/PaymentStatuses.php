<?php


namespace App\Enums;


class PaymentStatuses
{
    const CANCELED = "CANCELED";
    const REFUNDED = "REFUNDED";
    const SUCCEEDED = "SUCCEEDED";
    const INCOMPLETE = "INCOMPLETE";

    const TYPES = [
        self::CANCELED,
        self::REFUNDED,
        self::SUCCEEDED,
        self::INCOMPLETE,
    ];

}
