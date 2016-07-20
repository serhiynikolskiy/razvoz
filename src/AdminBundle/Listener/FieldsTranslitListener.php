<?php

namespace AdminBundle\Listener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;

class FieldsTranslitListener implements EventSubscriber
{
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getContainer()
    {
        return $this->container;
    }

    public function getSubscribedEvents()
    {
        return array(
            'prePersist',
            'preUpdate',
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->generateTranslit($entity, $args);
    }

    public function preUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->generateTranslit($entity, $args);
    }

    public function generateTranslit($entity, LifecycleEventArgs $args)
    {
        $translitService = $this->getTranslitService();

        if (method_exists($entity, 'getUri') && empty($entity->getUri())) {
            $entity->setUri($translitService->translit($entity->getTitle()));
        }
        if (method_exists($entity, 'getPermalink') && empty($entity->getPermalink())) {
            if(method_exists($entity, 'getTitleUa')){
                $entity->setPermalink($translitService->translit($entity->getTitleUa()));
            } else {
                $entity->setPermalink($translitService->translit($entity->getNameUa()));
            }

        }

    }

    public function getTranslitService()
    {
        return $this->getContainer()->get('artnikol.translit.service');
    }
}