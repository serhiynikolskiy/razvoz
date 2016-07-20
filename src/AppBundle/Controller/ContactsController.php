<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AdminBundle\Entity\Followers;

/**
 * Contacts controller.
 *
 * @Route("/contacts")
 */
class ContactsController extends Controller
{
    /**
     * @Route("/", name="contacts")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->get('doctrine.orm.entity_manager');

        $path = 'contacts';
        $locale = $this->get('request')->getLocale();
        $pageSeo = $em->getRepository('AdminBundle:Pages')->getPageSeoByPermalink($path, $locale);

        return $this->render('AppBundle:Contacts:index.html.twig', [
            'pageSeo' => $pageSeo,
        ]);
    }


    /**
     * @Route("/sending", name="send_letter_page")
     * @Method("POST")
     */
    public function sendAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $locale = $this->get('request')->getLocale();

        $emailConstraint = new Assert\Email();

        $data = $request->request;
        $subject = $data->get('subject');
        $email = $data->get('email');
        $name = $data->get('name');
        $variables = [
            'name' => $name,
            'email'=> $email,
            'body' => $data->get('body'),
        ];
        $from = [$email => $name];
        $emailTo = $this->container->getParameter('mailer_adress');
        $template = 'AppBundle:Contacts:send.html.twig';
        $mailerService = $this->container->get('app.get_mailer.service');

        if ($mailerService->sent($subject, $emailTo, $from, $template,  $variables, $textType = 'text/html' )) {

            if ($locale == 'ua'){
                $sendStatus = 'Ваша заявка була успішно відправлена. Дякуємо що завітали до нас. Ми надамо Вам відповідь найближчим часом.';
            } elseif ($locale == 'ru') {
                $sendStatus = 'Ваша заявка была успешно отправлена. Спасибо что обратились к нам. Мы ответим Вам в ближайшее время.';
            } else {
                $sendStatus = 'Your letter has been successfully sent. Thank you for contacting us. We will reply to you shortly.';
            }
        }
        else {
            if ($locale == 'ua'){
                $sendStatus = 'Ваша завка не була відправлена. Будь ласка, спробуйте ще раз.';
            } elseif ($locale == 'ru') {
                $sendStatus = 'Ваша завка не была отправлена. Пожалуйста, попробуйте еще раз.';
            } else {
                $sendStatus = 'Your request has not been sent. Please, try again.';
            }
        }

        $validator = $this->get('validator');
        $error = $validator->validate($email,$emailConstraint);
        if (0 === count($error) && $email != '') {
            $emailStatus = $em->getRepository('AdminBundle:Followers')->findBy(array('email' => $email));
            if(0 === count($emailStatus)) {
                $entity = new Followers();
                $entity->setDate(new \DateTime('now'));
                $entity->setEmail($email);
                $em->persist($entity);
                $em->flush();

            }
        }

        return new Response(json_encode($sendStatus), 200);
    }
}