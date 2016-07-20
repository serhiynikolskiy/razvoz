<?php

namespace AppBundle\DataFixtures\ORM;

use AdminBundle\Entity\Users;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LoadUsersEntityData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $user1 = new Users();
        $user1->setName('Admin');
        $user1->setSecondName('Admin');
        $user1->setSurname('Admin');
        $user1->setUsername('admin');
        $user1->setEmail('admin@mail.com');
        $user1->setPhone('+380507777777');
        $user1->setIsActive(true);
        $user1->setPassword('admin');
        $user1->setRole($this->getReference('admin_role'));

        $manager->persist($user1);
        $manager->persist($user1);
        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
