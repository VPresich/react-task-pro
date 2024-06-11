import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { useDispatch } from 'react-redux';
import SupportForm from '../Forms/SupportForm/SupportForm';
import { sendSupportEmail } from '../../redux/support/operations';


export default function SupportModal({ onClose }) {
    const dispatch = useDispatch();

    const onSubmitForm = (values) => {
        // send email
        dispatch(sendSupportEmail({email: values.email, text: values.comment}));
        console.log('support', values);
        onClose();
    }

  return (
     <div>
        <ModalWrapper onClose={onClose}>
            <SupportForm onSubmitForm={onSubmitForm}/>
        </ModalWrapper>
    </div>
  )
}
