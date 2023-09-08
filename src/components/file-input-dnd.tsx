import { IconX } from '@tabler/icons-react'
import React, { type FC } from 'react'
import { type Control, Controller } from 'react-hook-form'

interface Props {
  name: string
  control: Control<any>
}

const FileInputDnD: FC<Props> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error }
      }) => {
        return (
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer  
              ${
                error !== undefined
                  ? 'bg-danger-50 hover:bg-danger-100 border-danger-300'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              } `}
            >
              <div
                className={`flex flex-col items-center justify-center pt-5 pb-6  ${
                  error !== undefined ? 'text-danger' : 'text-gray-500'
                }`}
              >
                <svg
                  className="w-8 h-8 mb-4 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs mb-2">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...field}
                value={value?.fileName}
                onChange={(event) => {
                  onChange(event.target.files)
                }}
              />
            </label>

            <div className="w-full">
              {value !== undefined && (
                <p className="text-small text-default-500  my-1 flex items-center">
                  <span> file: {value[0].name}</span>
                  <button onClick={() => { onChange(undefined) }} type="button">
                    <IconX alignmentBaseline="middle" height={16} width={16} />
                  </button>
                </p>
              )}

              {error !== undefined && (
                <p className="text-small text-danger">{error?.message}</p>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

export default FileInputDnD
