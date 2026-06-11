import React from 'react';

const TextAreaField = ({
  labelName,
  name,
  placeholder,
  value,
  onChange,
  errorMsg = null,
}) => {
  return (
    <label className="relative flex flex-col gap-[0.625rem]">
      <h2 className="text-[1rem] text-(--white-white) font-semibold md:text-[1.25rem]">
        {labelName}
      </h2>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full max-w-[32.5rem] resize-none font-light border px-[1.25rem] py-[1.125rem] rounded-[0.125rem] focus:outline-none ${errorMsg ? 'border-(--red-red)' : ' border-(--gray-gray200)'}`}
        placeholder={placeholder}
        rows={5}
      />
      {errorMsg ? (
        <p className="absolute top-25 left-0 text-[1rem] text-(--red-red) font-light md:top-28">
          {errorMsg}
        </p>
      ) : (
        <></>
      )}
    </label>
  );
};

export default TextAreaField;
