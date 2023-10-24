import React, { useState, FormEvent, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { fireStore } from '../../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

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

  // Fetch addons data from Firestore
  useEffect(() => {
    const fetchAddons = async () => {
      const addonsCollection = collection(fireStore, 'addons');
      const addonsSnapshot = await getDocs(addonsCollection);

      const addonsData: Addon[] = [];
      addonsSnapshot.forEach((doc) => {
        addonsData.push({ id: doc.id, ...doc.data() } as Addon);
      });

      setAddons(addonsData);
    };

    fetchAddons();
  }, []);

  const handleAddonCheckboxChange = (addonId: string) => {
    setSelectedAddonIds((prevSelectedAddonIds) => {
      if (prevSelectedAddonIds.includes(addonId)) {
        // Remove the addonId if it's already selected
        return prevSelectedAddonIds.filter((id) => id !== addonId);
      } else {
        // Add the addonId if it's not selected
        return [...prevSelectedAddonIds, addonId];
      }
    });
  };

  const renderAddonCheckboxes = () => {
    return addons.map((addon) => (
      <div key={addon.id}>
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor={addon.id}
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              id={addon.id}
              checked={selectedAddonIds.includes(addon.id)}
              onChange={() => handleAddonCheckboxChange(addon.id)}
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <label
            className="mt-px cursor-pointer select-none font-light text-gray-700"
            htmlFor={addon.id}
          >
            {addon.name} (+Rp{addon.price})
          </label>
        </div>
      </div>
    ));
  };

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

  const nextStep = () => {
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
      if (!formData.recipient_name) {
        validationErrors.sender_phone = 'Please input recipient name';
      } else if (!formData.recipient_phone) {
        validationErrors.sender_phone = 'Please input recipient phone';
      } else if (!formData.recipient_class) {
        validationErrors.sender_phone = 'Please input recipient class room';
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

    if (!formData.recipient_name) {
      validationErrors.recipient_name = 'Please input recipient name';
    } else if (!formData.recipient_phone) {
      validationErrors.recipient_phoneAndRoom = 'Please input recipient phone';
    } else if (!formData.recipient_class) {
      validationErrors.recipient_phoneAndRoom =
        'Please input recipient class room';
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
    };

    try {
      const docRef = await addDoc(collection(fireStore, 'order'), orderData);
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
        <div className="flex items-center">
          <div
            className={`flex items-center cursor-pointer relative ${
              step >= 1
                ? step == 1
                  ? 'text-white'
                  : 'text-pink-600'
                : 'text-gray-500'
            }`}
            onClick={() => setStep(1)}
          >
            <div
              className={`flex items-center justify-center rounded-full transition duration-100 ease-in-out h-12 w-12 py-3 border-2 ${
                step == 1 ? 'bg-pink-600' : ''
              } ${step >= 1 ? 'border-pink-600' : 'border-gray-300'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                step >= 1 ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              Product
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
              step >= 2 ? 'border-pink-600' : 'border-gray-300'
            }`}
          ></div>
          <div
            className={`flex cursor-pointer items-center relative ${
              step >= 2
                ? step == 2
                  ? 'text-white'
                  : 'text-pink-600'
                : 'text-gray-500'
            }`}
            onClick={() => setStep(2)}
          >
            <div
              className={`flex items-center justify-center rounded-full transition duration-100 ease-in-out h-12 w-12 py-3 border-2 ${
                step == 2 ? 'bg-pink-600' : ''
              } ${step >= 2 ? 'border-pink-600' : 'border-gray-300'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                step >= 2 ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              Details
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300  ${
              step >= 3 ? 'border-pink-600' : 'border-gray-300'
            }`}
          ></div>
          <div
            className={`flex cursor-pointer items-center relative ${
              step >= 3
                ? step == 3
                  ? 'text-white'
                  : 'text-pink-600'
                : 'text-gray-500'
            }`}
            onClick={() => setStep(3)}
          >
            <div
              className={`flex items-center justify-center rounded-full transition duration-100 ease-in-out h-12 w-12 py-3 border-2 ${
                step == 3 ? 'bg-pink-600' : ''
              } ${step >= 3 ? 'border-pink-600' : 'border-gray-300'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                />
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500 ${
                step >= 3 ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              Recipient
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        {step === 1 && (
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Qty
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    type="number"
                    name="qty"
                    id="qty"
                    placeholder="1"
                    min="1"
                    value={formData.qty}
                    onChange={handleInputChange}
                    className="w-24 appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full mx-2 md:flex-2 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Color
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <select
                    className="w-64 md:flex-1 appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Select color
                    </option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="pink">Pink</option>
                    <option value="white">White</option>
                    <option value="purple">Purple</option>
                    <option value="others">*others</option>
                  </select>

                  {selectedOption === 'others' && (
                    <input
                      type="text"
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                      placeholder="red, green, blue"
                      value={customInput}
                      onChange={handleCustomInputChange}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="text-red-500 text-xs mt-1">
              {errors.qtyAndColor}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 md:flex-2 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Addons
                </div>
                {renderAddonCheckboxes()}
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  {' '}
                  Sending Time
                </div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="bg-white border-b">
                            <tr>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                Day
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                              >
                                09:00 - 09:10
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                              >
                                11:00 - 11:10
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                              >
                                13:00 - 13:10
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                              >
                                15:00 - 15:10
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                              >
                                17:00 - 17:10
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-100 border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Monday
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="mondaySlot"
                                  value="09:00-09:10"
                                  checked={
                                    formData.mondaySlot === '09:00-09:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="mondaySlot"
                                  value="11:00-11:10"
                                  checked={
                                    formData.mondaySlot === '11:00-11:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="mondaySlot"
                                  value="13:00-13:10"
                                  checked={
                                    formData.mondaySlot === '13:00-13:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="mondaySlot"
                                  value="15:00-15:10"
                                  checked={
                                    formData.mondaySlot === '15:00-15:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="mondaySlot"
                                  value="17:00-17:10"
                                  checked={
                                    formData.mondaySlot === '17:00-17:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Tuesday
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="tuesdaySlot"
                                  value="09:00-09:10"
                                  checked={
                                    formData.tuesdaySlot === '09:00-09:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="tuesdaySlot"
                                  value="11:00-11:10"
                                  checked={
                                    formData.tuesdaySlot === '11:00-11:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="tuesdaySlot"
                                  value="13:00-13:10"
                                  checked={
                                    formData.tuesdaySlot === '13:00-13:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="tuesdaySlot"
                                  value="15:00-15:10"
                                  checked={
                                    formData.tuesdaySlot === '15:00-15:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="tuesdaySlot"
                                  value="17:00-17:10"
                                  checked={
                                    formData.tuesdaySlot === '17:00-17:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr className="bg-gray-100 border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Wednesday
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="wednesdaySlot"
                                  value="09:00-09:10"
                                  checked={
                                    formData.wednesdaySlot === '09:00-09:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="wednesdaySlot"
                                  value="11:00-11:10"
                                  checked={
                                    formData.wednesdaySlot === '11:00-11:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="wednesdaySlot"
                                  value="13:00-13:10"
                                  checked={
                                    formData.wednesdaySlot === '13:00-13:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="wednesdaySlot"
                                  value="15:00-15:10"
                                  checked={
                                    formData.wednesdaySlot === '15:00-15:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="wednesdaySlot"
                                  value="17:00-17:10"
                                  checked={
                                    formData.wednesdaySlot === '17:00-17:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Thursday
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="thursdaySlot"
                                  value="09:00-09:10"
                                  checked={
                                    formData.thursdaySlot === '09:00-09:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="thursdaySlot"
                                  value="11:00-11:10"
                                  checked={
                                    formData.thursdaySlot === '11:00-11:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="thursdaySlot"
                                  value="13:00-13:10"
                                  checked={
                                    formData.thursdaySlot === '13:00-13:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="thursdaySlot"
                                  value="15:00-15:10"
                                  checked={
                                    formData.thursdaySlot === '15:00-15:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="thursdaySlot"
                                  value="17:00-17:10"
                                  checked={
                                    formData.thursdaySlot === '17:00-17:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr className="bg-gray-100 border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Friday
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="fridaySlot"
                                  value="09:00-09:10"
                                  checked={
                                    formData.fridaySlot === '09:00-09:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="fridaySlot"
                                  value="11:00-11:10"
                                  checked={
                                    formData.fridaySlot === '11:00-11:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="fridaySlot"
                                  value="13:00-13:10"
                                  checked={
                                    formData.fridaySlot === '13:00-13:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="fridaySlot"
                                  value="15:00-15:10"
                                  checked={
                                    formData.fridaySlot === '15:00-15:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="fridaySlot"
                                  value="17:00-17:10"
                                  checked={
                                    formData.fridaySlot === '17:00-17:10'
                                  }
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-red-500 text-xs mt-1">{errors.time}</div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Your Phone Number
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    type="text"
                    name="sender_phone"
                    id="sender_phone"
                    placeholder="08XXXXXXXXXX"
                    value={formData.sender_phone}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="text-red-500 text-xs mt-1">
              {errors.sender_phone}
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Recipient Name
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    type="text"
                    name="recipient_name"
                    id="recipient_name"
                    placeholder="John Doe"
                    value={formData.recipient_name}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="text-red-500 text-xs mt-1">
              {errors.recipient_name}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Recipient Phone Number
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    type="text"
                    name="recipient_phone"
                    id="recipient_phone"
                    placeholder="08XXXXXXXXXX"
                    value={formData.recipient_phone}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  Recipient Class Room
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    type="text"
                    name="recipient_class"
                    id="recipient_class"
                    placeholder="A1305"
                    value={formData.recipient_class}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="text-red-500 text-xs mt-1">
              {errors.recipient_phoneAndRoom}
            </div>
          </div>
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
                onClick={handleSubmit}
                className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-pink-200  
        bg-pink-100 
        text-pink-700 
        border duration-200 ease-in-out 
        border-pink-600 transition"
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
