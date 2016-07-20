<?php

namespace AdminBundle\Helper;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\HasLifecycleCallbacks
 * @ORM\Entity
 */
class UploadImageHelper
{
    private $temp;

    private $tempTopImage;

    /**
     * @var string
     *
     * @Assert\File(maxSize="5M")
     */
    private $photo;

    /**
     * @var string
     *
     * @Assert\File(maxSize="5M")
     */
    private $top_image;

    /**
     * @var string
     *
     * @ORM\Column(name="photo", type="string", length=255, nullable=true)
     */
    protected $photoName;

    /**
     * @var string
     *
     * @ORM\Column(name="top_image", type="string", length=255, nullable=true)
     */
    protected $topImageName;

    /**
     * Set photo
     *
     * @param UploadedFile $photo
     * @return News
     */
    public function setPhoto(UploadedFile $photo = null)
    {


        $this->photo = $photo;
        if (isset($this->photoName)) {
            // store the old name to delete after the update
            $this->temp = $this->photoName;
            $this->photoName = null;
        } else {
            $this->photoName = 'initial';
        }
    }

    /**
     * Get photo
     *
     * @return string
     */
    public function getPhoto()
    {
        return $this->photo;
    }

    /**
     * Set top_image
     *
     * @param UploadedFile $top_image
     * @return Works
     */
    public function setTopImage(UploadedFile $top_image = null)
    {
        $this->top_image = $top_image;
        if (isset($this->topImageName)) {
            // store the old name to delete after the update
            $this->tempTopImage = $this->topImageName;
            $this->topImageName = null;
        } else {
            $this->topImageName = 'initial';
        }
    }

    /**
     * Get top_image
     *
     * @return string
     */
    public function getTopImage()
    {
        return $this->top_image;
    }

    /**
     * Get photo
     *
     * @return string
     */
    public function getPhotoName()
    {
        return $this->photoName;
    }

    /**
     * Get top_image
     *
     * @return string
     */
    public function getTopImageName()
    {
        return $this->topImageName;
    }

    public function getAbsolutePath()
    {
        return null === $this->photoName
            ? null
            : $this->getUploadRootDir().'/'.$this->photoName;
    }

    public function getAbsolutePathTopImage()
    {
        return null === $this->topImageName
            ? null
            : $this->getUploadRootDirTopImage().'/'.$this->topImageName;
    }

    public function getWebPath()
    {
        return null === $this->photoName
            ? null
            : $this->getUploadDir().'/'.$this->photoName;
    }

    public function getWebPathTopImage()
    {
        return null === $this->topImageName
            ? null
            : $this->getUploadDirTopImage().'/'.$this->topImageName;
    }

    protected function getUploadRootDir()
    {
        // the absolute directory path where uploaded
        // documents should be saved
        return __DIR__ . '/../../../web/' . $this->getUploadDir();
    }

    protected function getUploadRootDirTopImage()
    {
        // the absolute directory path where uploaded
        // documents should be saved
        return __DIR__ . '/../../../web/' . $this->getUploadDirTopImage();
    }

    protected function getUploadDir()
    {
        // get rid of the __DIR__ so it doesn't screw up
        // when displaying uploaded doc/image in the view.
        return 'uploads/' . $this->getEntityName() . '/' . $this->getId();
    }

    protected function getUploadDirTopImage()
    {
        // get rid of the __DIR__ so it doesn't screw up
        // when displaying uploaded doc/image in the view.
        return 'uploads/' . $this->getEntityName(). '/' . $this->getId() . '/top_image/';
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function preUpload()
    {
        if (null !== $this->getPhoto()) {
            // do whatever you want to generate a unique name
            $filename = uniqid();
            $this->photoName = $filename.'.'.$this->getPhoto()->guessExtension();
        }

        if (null !== $this->getTopImage()) {

            // do whatever you want to generate a unique name
            $filename = uniqid();
            $this->topImageName = $filename.'.'.$this->getTopImage()->guessExtension();
        }
    }

    /**
     * @ORM\PostPersist()
     * @ORM\PostUpdate()
     */
    public function upload()
    {

//        var_dump($this);exit;

        if (null !== $this->getPhoto()){

            if (null === $this->getPhoto()) {
                return;
            }

            // if there is an error when moving the file, an exception will
            // be automatically thrown by move(). This will properly prevent
            // the entity from being persisted to the database on error
            $this->getPhoto()->move($this->getUploadRootDir(), $this->photoName);

            // check if we have an old image
            if (isset($this->temp) && $this->temp != 'initial') {
                // delete the old image
                unlink($this->getUploadRootDir() . '/' . $this->temp);
                // clear the temp image path
                $this->temp = null;
            }
            $this->photo = null;

        }

        if (null !== $this->getTopImage()){

            if (null === $this->getTopImage()) {
                return;
            }
            // if there is an error when moving the file, an exception will
            // be automatically thrown by move(). This will properly prevent
            // the entity from being persisted to the database on error
            $this->getTopImage()->move($this->getUploadRootDirTopImage(), $this->topImageName);

            // check if we have an old image
            if (isset($this->tempTopImage) && $this->tempTopImage != 'initial') {
                // delete the old image
                unlink($this->getUploadRootDirTopImage() . '/' . $this->tempTopImage);
                // clear the temp image path
                $this->tempTopImage = null;
            }
            $this->top_image = null;

        }

    }

    /**
     * @ORM\PreRemove()
     */
    public function removeUpload()
    {
        $file = $this->getAbsolutePath();
        if ($file) {
            unlink($file);
            $this->photoName = null;

            return true;
        }
    }

    /**
     * @ORM\PreRemove()
     */
    public function removeUploadTopImage(){

        $fileTopImage = $this->getAbsolutePathTopImage();
        if ($fileTopImage) {
            unlink($fileTopImage);
            $this->topImageName = null;

            return true;
        }
    }

    public function getEntityName()
    {
        return strtolower(substr(strrchr(get_class($this), "\\"), 1));
    }

    public function getFixturesPhotoPath()
    {
        return __DIR__ . '/../../../web/includes/admin/image/fixtures/' . $this->getEntityName() . '/';
    }

    public function getCopyImagePath($imageName)
    {
        copy($this->getFixturesPhotoPath() . $imageName, $this->getFixturesPhotoPath() . 'copy-' . $imageName);

        return $this->getFixturesPhotoPath() . 'copy-' . $imageName;
    }

    public function getPhotoWebPath($photoName)
    {
        return null === $photoName
            ? null
            : $this->getUploadDir() . '/' . $photoName;
    }

    public function getPhotoWebPathTopImage($topImageName)
    {
        return null === $topImageName
            ? null
            : $this->getUploadDirTopImage() . '/' . $topImageName;
    }
}
