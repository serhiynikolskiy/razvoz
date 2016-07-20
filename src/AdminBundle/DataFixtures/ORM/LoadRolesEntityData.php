<?php

namespace AdminBundle\DataFixtures\ORM;

use AdminBundle\Entity\Roles;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LoadRolesEntityData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

        $role = new Roles();
        $role
            ->setName("ROLE_ADMIN")
            ->setIsActive(1)
        ;
        $role1 = new Roles();
        $role1
            ->setName("ROLE_USER")
            ->setIsActive(1)
        ;
        $role2 = new Roles();
        $role2
            ->setName("ROLE_SUPER_ADMIN")
            ->setIsActive(1)
        ;

        $manager->persist($role);
        $manager->persist($role1);
        $manager->persist($role2);
        $manager->flush();
        $this->addReference('admin_role', $role);
        $this->addReference('user_role', $role1);
        $this->addReference('super_admin_role', $role2);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
}