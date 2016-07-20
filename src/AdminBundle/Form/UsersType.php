<?php

namespace AdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UsersType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, array(
                'label' => 'Электронная почта'
            ))
            ->add('username', null, array(
                'label' => 'Имя пользователя'
            ))
            ->add('password', null, array(
                'label' => 'Пароль'
            ))
            ->add('name', null, array(
                'label' => 'Имя'
            ))
            ->add('role',  null ,array(
                'required' => true,
                'label' => 'Роль'
            ))
            ->add('isActive', null, array(
                'label' => 'Активно',
//                'attr' => array('class' => ''),
            ))
            
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AdminBundle\Entity\Users'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'adminbundle_users';
    }
}
