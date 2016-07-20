<?php
/**
 * Created by PhpStorm.
 * User: it
 * Date: 21.03.16
 * Time: 17:06
 */

namespace AdminBundle\Services;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use AdminBundle\Entity\Files;
use AdminBundle\Helper\Transliterator;
use Symfony\Component\DependencyInjection\Container;

class FileActionsService
{
    private $em;

    public function __construct(EntityManager $em, Container $container)
    {
        $this->em = $em;
        $this->container = $container;
    }

    public function uploadFiles($files, $entityType, $entityId)
    {

        foreach($files as $file) {

            if(isset($file)){
                $translitName = Transliterator::cirilicToLatin($file->getClientOriginalName());
                $fileName = uniqid() . '_' . $translitName;

                $dir = $this->container->getParameter('kernel.root_dir') . '/../web/uploads/attached_files';
                $file->move($dir, $fileName);

                $fileDb = new Files();
                $fileDb->setEntityId($entityId);
                $fileDb->setEntityType($entityType);
                $fileDb->setPath($fileName);
                $this->em->persist($fileDb);
                $this->em->flush();
            }

        }

    }

    public function removeFiles($entityType, $entityId)
    {
        $files = $this->em->getRepository('AdminBundle:Files')
            ->getAllFilesByEntityId($entityId, $entityType);

        if(!empty($files)){

            $dir = $this->container->getParameter('kernel.root_dir').'/../web/uploads/attached_files';

            foreach($files as $file){

                $fileDb = $this->em->getRepository('AdminBundle:Files')->find($file['id']);

                $this->em->remove($fileDb);
                $this->em->flush();

                unlink($dir.'/'.$file['path']);
            }

        }

    }

    function deleteDir($dirPath)
    {
        if (!is_dir($dirPath)) {

            return;

        }

        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {

            $dirPath .= '/';

        }

        $files = scandir($dirPath);

        foreach ($files as $file) {

            if ($file === '.' || $file === '..') continue;

            if (is_dir($dirPath.$file)) {

                $this->deleteDir($dirPath.$file);

            } else {

                if ($dirPath.$file !== __FILE__) {
                    unlink($dirPath.$file);
                }

            }
        }

        rmdir($dirPath);
    }
}