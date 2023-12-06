import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import { useForm, useWatch } from 'react-hook-form';
import './TextDropZone.css';
import InputField from '.';
export const TextAndDropzone = ({ onUpload, serial, value, child }) => {
  const [text, setText] = useState(value ?? '');
  const [imageData, setImageData] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      serial: serial,
      title: text,
      image: imageData
    }
  });
  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  const submitData = (data, e) => {
    e.preventDefault();
    if (imageData) {
      data.image = imageData;
      onUpload(data);
    } else onUpload(data);
  };
  const handleFileUpload = (files) => {
    if (files?.meta?.status === 'done') {
      setImageData(files?.file);
    }
    if (files?.meta?.status === 'removed') {
      setImageData('');
    }
  };
  let dropzoneCss = {
    dropzone: {
      overflow: 'hidden',
      maxHeight: '120px',
      borderRadius: '5px',
      border: '1px solid #cdcdcd',
      backgroundColor: '#fff',
      maxWidth: '50%',
      minWidth: '50%',
      padding: '5px'
    },
    inputLabelWithFiles: {
      display: 'none'
    },
    inputLabel: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#777',
      textAlign: 'center',
      marginTop: '10px'
    },
    preview: {
      // padding: "15px",
      maxHeight: '20px'
    }
  };
  const placeholder = `Title Challenge ${serial}`;
  // console.log('value', getValues());
  return (
    <form className="text-and-dropzone">
      <div className="textInputbox">
        <input
          type="text"
          id="text-field"
          name="title"
          value={text}
          {...register('title')}
          onChange={handleChangeText}
          {...control}
          placeholder={placeholder}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '100%'
        }}>
        <Dropzone
          onChangeStatus={handleFileUpload}
          accept="image/*"
          name="image"
          maxFiles={1}
          multiple={false}
          inputContent="Drop an image here or click to select one."
          styles={dropzoneCss}
        />
        <div
          style={{
            marginTop: '-10px',
            overflow: 'hidden',
            height: '130px',
            objectFit: 'contain',
            maxWidth: '50%'
          }}>
          {child}
        </div>
        <button type="submit" onClick={handleSubmit(submitData)}>
          Add
        </button>
      </div>
    </form>
  );
};
