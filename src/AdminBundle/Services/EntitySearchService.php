<?php

namespace AdminBundle\Services;

use Doctrine\ORM\EntityManager;

class EntitySearchService
{
    private $em;

    public function getEm()
    {
        return $this->em;
    }

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function getContentEntities($text, $locale)
    {
        $result['news'] = $this->getEm()->getRepository('AdminBundle:News')->findAllNewsBySearch($text, $locale);
        $result['works'] = $this->getEm()->getRepository('AdminBundle:Works')->findAllWorksBySearch($text, $locale);

        return $result;
    }
}