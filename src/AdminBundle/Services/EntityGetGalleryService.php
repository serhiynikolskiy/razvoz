<?php

namespace AdminBundle\Services;

use Doctrine\ORM\EntityManager;

class EntityGetGalleryService
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

    public function getEntityUploadDir($id, $photo)
    {
        return 'uploads/media/'.$id.'/'.$photo;
    }

    public function getMediasForEntity($galleryId)
    {
        $galleryPhoto = $this->getEm()->getRepository('AdminBundle:Media')->getMediaForGallery($galleryId);

        $result = $this->transformGalleryResults($galleryPhoto);

        return $result;
    }

    public function getMediasShowForEntity($galleryId, $show)
    {
        $galleryPhoto = $this->getEm()->getRepository('AdminBundle:Media')->getMediaShowForGallery($galleryId, $show);

        $result = $this->transformGalleryResults($galleryPhoto);

        return $result;
    }

    public function transformGalleryResults($galleryPhoto)
    {
        $gallery = [];
        foreach($galleryPhoto as $id => $photo) {

            if ($photo['photoName'] == null) {
                $lastSlash = strrpos($photo['path'], '/');
                $dataYoutube = substr($photo['path'], $lastSlash + 1);
                $gallery[$id]['dataYoutube'] = $dataYoutube;
                $gallery[$id]['path'] = $photo['path'];
                $gallery[$id]['type'] = 'video';
            }
            else{
                $gallery[$id]['path'] = $this->getEntityUploadDir($photo['id'], $photo['photoName']);
                $gallery[$id]['type'] = 'photo';
            }

        }

        return $gallery;
    }
}