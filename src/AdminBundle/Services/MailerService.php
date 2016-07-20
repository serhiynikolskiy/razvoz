<?php

namespace AdminBundle\Services;

use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\DependencyInjection\Container;

class MailerService
{
    private $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }
    public function getContainer()
    {
        return $this->container;
    }

    public function sent($subject, $to, $from, $template, array $variables = array(), $textType = 'text/html')
    {
        $body = $this->container->get('templating')->render($template, $variables);
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setTo($to)
            ->setFrom($from)
            ->setBody($body, $textType);

        $mailer = $this->getContainer()->get('mailer');

        if ($mailer->send($message)) {
            return true;
        }
        else {
            return false;
        }
    }
}