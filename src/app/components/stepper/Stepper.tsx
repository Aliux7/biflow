import React, { useState, useRef, useEffect } from 'react';
import { fireStore } from '../../../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { PaintableRef } from '../Paintable/PaintableRef';
import './canvas.css';
import Indicator from './indicator';
import ProductForm from './ProductForm';
import DetailsForm from './DetailsForm';
import RecipientForm from './RecipientForm';

interface Addon {
  id: string;
  name: string;
  price: number;
}

interface ProductComponentProps {
  name: string;
}

const Stepper = (props: ProductComponentProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    qty: 1,
    mondaySlot: '',
    tuesdaySlot: '',
    wednesdaySlot: '',
    thursdaySlot: '',
    fridaySlot: '',
    sender_phone: '',
    recipient_name: '',
    recipient_phone: '',
    recipient_class: '',
  });
  const [agreed, setAgreed] = useState(false);

  const resetForm = () => {
    setFormData({
      qty: 1,
      mondaySlot: '',
      tuesdaySlot: '',
      wednesdaySlot: '',
      thursdaySlot: '',
      fridaySlot: '',
      sender_phone: '',
      recipient_name: '',
      recipient_phone: '',
      recipient_class: '',
    });
    setSelectedOption('');
    setCustomInput('');
    setErrors({
      qtyAndColor: '',
      time: '',
      sender_phone: '',
      recipient_name: '',
      recipient_phoneAndRoom: '',
    });
  };

  const [errors, setErrors] = useState({
    qtyAndColor: '',
    time: '',
    sender_phone: '',
    recipient_name: '',
    recipient_phoneAndRoom: '',
  });

  const [addons, setAddons] = useState<Addon[]>([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [customInput, setCustomInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue !== 'others') {
      setCustomInput(''); // Clear the custom input if the user selects a regular option
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value);
  };

  const paintableRef = useRef<PaintableRef>(null);
  const [imageResult, setImageResult] = useState('');

  const saveImage = () => {
    if (step === 1) paintableRef.current?.save();
  };

  const changeStep = (step: number) => {
    saveImage();
    setStep(step);
  };

  const nextStep = () => {
    saveImage();
    const validationErrors = {
      qtyAndColor: '',
      time: '',
      sender_phone: '',
      recipient_name: '',
      recipient_phoneAndRoom: '',
    };

    if (step === 1) {
      if (formData.qty < 1) {
        validationErrors.qtyAndColor = 'Please input valid quantity';
      } else if (
        !selectedOption ||
        (selectedOption === 'others' && !customInput)
      ) {
        validationErrors.qtyAndColor = 'Please select a color';
      }
    } else if (step === 2) {
      if (!formData.sender_phone) {
        validationErrors.sender_phone = 'Please input your phone number';
      }
    } else if (step === 3) {
      if (selectedAddonIds.includes('delivery')) {
        if (!formData.recipient_name) {
          validationErrors.sender_phone = 'Please input recipient name';
        } else if (!formData.recipient_phone) {
          validationErrors.sender_phone = 'Please input recipient phone';
        } else if (!formData.recipient_class) {
          validationErrors.sender_phone = 'Please input recipient class room';
        }
      }
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== '')) {
      toast.warn('Please input valid information', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const validationErrors = {
      qtyAndColor: '',
      time: '',
      sender_phone: '',
      recipient_name: '',
      recipient_phoneAndRoom: '',
    };

    if (formData.qty < 1) {
      validationErrors.qtyAndColor = 'Please input valid quantity';
    } else if (
      !selectedOption ||
      (selectedOption === 'others' && !customInput)
    ) {
      validationErrors.qtyAndColor = 'Please select a color';
    }

    if (!formData.sender_phone) {
      validationErrors.sender_phone = 'Please input your phone number';
    }

    if (selectedAddonIds.includes('delivery')) {
      if (!formData.recipient_name) {
        validationErrors.recipient_name = 'Please input recipient name';
      } else if (!formData.recipient_phone) {
        validationErrors.recipient_phoneAndRoom =
          'Please input recipient phone';
      } else if (!formData.recipient_class) {
        validationErrors.recipient_phoneAndRoom =
          'Please input recipient class room';
      }
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== '')) {
      toast.warn('Please input valid information', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    toast.info('Processing order...', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    const selectedAddons = addons.filter((addon) =>
      selectedAddonIds.includes(addon.id)
    );

    const selectedAddonNames = selectedAddons
      .map((addon) => addon.name)
      .join(', ');
    const orderData = {
      ...formData,
      color: selectedOption === 'others' ? customInput : selectedOption,
      orderDate: formattedDateTime,
      addons: selectedAddonNames,
      product: props.name,
      image: imageResult,
      status: 'Unpaid',
    };

    try {
      const docRef = await addDoc(collection(fireStore, 'order'), orderData);
      toast.success('Order submitted', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      router.push(`/order/${docRef.id}`);
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Something went wrong! please try again later...', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className="p-2">
      <ToastContainer />
      <div className="mx-4 px-6">
        <Indicator step={step} changeStep={changeStep} />
      </div>
      <div className="mt-12">
        {step === 1 && (
          <ProductForm
            paintableRef={paintableRef}
            formData={formData}
            imageResult={imageResult}
            setImageResult={setImageResult}
            addons={addons}
            setAddons={setAddons}
            selectedAddonIds={selectedAddonIds}
            setSelectedAddonIds={setSelectedAddonIds}
            handleInputChange={handleInputChange}
            selectedOption={selectedOption}
            handleSelectChange={handleSelectChange}
            handleCustomInputChange={handleCustomInputChange}
            errors={errors}
          />
        )}
        {step === 2 && (
          <DetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {step === 3 && (
          <RecipientForm
            formData={formData}
            agreed={agreed}
            setAgreed={setAgreed}
            selectedAddonIds={selectedAddonIds}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        <div className="flex p-2 mt-4">
          {step === 1 && (
            <button
              onClick={resetForm}
              className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition"
            >
              Reset Form
            </button>
          )}

          {step !== 1 && (
            <button
              onClick={prevStep}
              className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition"
            >
              Previous
            </button>
          )}

          <div className="flex-auto flex flex-row-reverse">
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-pink-600  
        bg-pink-600 
        text-pink-100 
        border duration-200 ease-in-out 
        border-pink-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                disabled={!agreed}
                onClick={handleSubmit}
                className={`text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-pink-600  
        bg-pink-600 
        text-pink-100 
        border duration-200 ease-in-out 
        border-pink-600 transition
  ${!agreed ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
