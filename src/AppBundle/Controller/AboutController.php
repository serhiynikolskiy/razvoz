<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class AboutController extends Controller
{
    /**
     * @Route("/about", name="about_page")
     */
    public function aboutUsAction()
    {
        $locale = $this->get('request')->getLocale();
        $em = $this->get('doctrine.orm.entity_manager');

        $path = 'about';

        $pageSeo = $em->getRepository('AdminBundle:Pages')->getPageSeoByPermalink($path, $locale);

        return $this->render('AppBundle:About:about.html.twig', array(
            'seo'           => $pageSeo,
            'locale'        => $locale
        ));
    }
}
