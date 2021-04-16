<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Auth\Notifications\ResetPassword as ResetPassword;
use Illuminate\Support\Facades\Lang;

class ResetPasswordNotification extends ResetPassword
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        if (static::$createUrlCallback) {
            $url = call_user_func(static::$createUrlCallback, $notifiable, $this->token);
        } else {
            $url = url(route('password.reset', [
                'token' => $this->token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));
        }

        return (new MailMessage)
            ->subject(Lang::get('Reset hasła - Studiuj.pl'))
            ->markdown('vendor.notifications.email')
            ->line(Lang::get('Otrzymujesz tę wiadomość e-mail, ponieważ otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta.'))
            ->action(Lang::get('Reset Password'), $url)
            ->line(Lang::get('Ten link do resetowania hasła wygaśnie za 60 minut.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
            ->line(Lang::get('Jeśli nie prosiłeś o zresetowanie hasła, nie są wymagane żadne dalsze działania.'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
