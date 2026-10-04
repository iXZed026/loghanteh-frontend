import FadeUp from '@/components/animations/FadeUp'
import EditProfileForm from '@/features/loghante(root)/profile/componenets/edit-profile/EditProfileForm'
import { useTranslations } from 'next-intl'

function EditProfile() {

    const editProfileT = useTranslations("profileEdit")


    return (
        <FadeUp>
            <div>
                {/* Edit Profile Header */}
                <div className='mb-10 fcol  gap-5'>
                    <h2 className='font-medium md:text-4xl text-2xl'>
                        {
                            editProfileT("title")
                        }
                    </h2>
                    <span
                        className='lg:text-xl text-black-light-utility'
                    >
                        {
                            editProfileT("description")
                        }
                    </span>
                </div>
                {/* Edit Profile Form  */}
                <EditProfileForm />
            </div>
        </FadeUp>
    )
}

export default EditProfile