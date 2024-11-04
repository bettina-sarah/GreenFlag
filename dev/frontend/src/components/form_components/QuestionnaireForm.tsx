import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Datepicker,
  Checkbox,
  Label,
  Select,
  TextInput,
  Dropdown,
  Textarea,
} from "flowbite-react";
import ImageInputCustom from "../ImageInput";
import {
  FormDataHobbies,
  FormDataInfo,
  FormDataPhoto,
  onSubmitFormHobbies,
  onSubmitFormInfo,
  onSubmitPhoto,
  genders,
  religions,
  hobbiesKeys,
} from "../form_submits/QuestionnaireSubmitHandlers";
// https://marmelab.com/react-admin/ImageInput.html

const QuestionnaireForm = () => {
  const navigate = useNavigate(); //hook

  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const {
    register: registerHobbies,
    handleSubmit: handleSubmitHobbies,
    formState: { errors: errorsHobbies },
  } = useForm<FormDataHobbies>();

  const {
    register: registerInfo,
    control: controlInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo },
  } = useForm<FormDataInfo>();

  const { control, handleSubmit: handleSubmitPhoto } = useForm<FormDataPhoto>();

  return (
    <div className="flex flex-col justify-between m-2 overflow-visible">
      <form
        onSubmit={handleSubmitHobbies((data) =>
          onSubmitFormHobbies(data, navigate)
        )}
      >
        <div className="flex flex-col space-y-4 p-3 m-4">
          {hobbiesKeys.map((hobby, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox id={hobby} {...registerHobbies(hobby)} />
              <Label htmlFor={hobby}>{hobby}</Label>
            </div>
          ))}
        </div>

        <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
          Submit
        </button>
      </form>
      <form
        onSubmit={handleSubmitInfo((data) => onSubmitFormInfo(data, navigate))}
      >
        <label>Select Your Date of Birth:</label>
        <Controller
          name="date_of_birth"
          control={controlInfo}
          defaultValue={new Date()}
          render={({ field }) => (
            <Datepicker
              {...field}
              onChange={(date: Date | null) => field.onChange(date)}
            />
          )}
        />
        {errorsInfo.date_of_birth &&
          errorsInfo.date_of_birth.type === "required" && (
            <span>This is required</span>
          )}

        <label>Select Your Gender:</label>
        <Select {...registerInfo("gender", { required: true })}>
          {genders.map((gender, index) => (
            <option value={gender} key={index}>
              {gender}
            </option>
          ))}
        </Select>
        {errorsInfo.gender && errorsInfo.gender.type === "required" && (
          <span>This is required</span>
        )}

        <label>Enter Your Height (in cm):</label>
        <TextInput
          {...registerInfo("height", { required: true })}
          type="number"
          placeholder="e.g., 175"
        />
        {errorsInfo.height && errorsInfo.height.type === "required" && (
          <span>This is required</span>
        )}

        <label>Select Your Religion or Belief:</label>
        <Select {...registerInfo("religion", { required: true })}>
          {religions.map((religion, index) => (
            <option value={religion} key={index}>
              {religion}
            </option>
          ))}
        </Select>
        {errorsInfo.religion && errorsInfo.religion.type === "required" && (
          <span>This is required</span>
        )}

        <div className="flex items-center gap-2">
          <Label htmlFor="want_kids">Do you want kids? (check for yes)</Label>
          <Checkbox {...registerInfo("want_kids")} />
        </div>

        <label>Insert Your City:</label>
        <TextInput
          {...registerInfo("city", { required: true, maxLength: 50 })}
          maxLength={50}
        />
        {errorsInfo.city && errorsInfo.city.type === "required" && (
          <span>This is required</span>
        )}
        {errorsInfo.city && errorsInfo.city.type === "maxLength" && (
          <span>Max length exceeded</span>
        )}

        <label>Tell us a little thing about yourself:</label>
        <Textarea
          {...registerInfo("bio", { required: true })}
          required
          rows={6}
        />

        <div className="flex flex-col">
          <label>Age preference range:</label>
          <div className="flex flex-row justify-evenly">
            <label>
              Prefered minimum age:
              <input
                type="number"
                {...registerInfo("min_age", { min: 18, max: 99 })}
                min={18}
                max={99}
                defaultValue={18}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errorsInfo.max_age ? "border-red-500" : ""
                }`}
              />
              {errorsInfo.min_age && errorsInfo.min_age.type === "required" && (
                <span>This is required</span>
              )}
              {errorsInfo.min_age && errorsInfo.min_age.type === "min" && (
                <span>It needs to be above 18 years old</span>
              )}
              {errorsInfo.min_age && errorsInfo.min_age.type === "max" && (
                <span>It needs to be below 99 years old</span>
              )}
            </label>
            <label>
              Prefered maximum age:
              <input
                type="number"
                {...registerInfo("max_age", { min: 18, max: 99 })}
                min={18}
                max={99}
                defaultValue={60}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errorsInfo.max_age ? "border-red-500" : ""
                }`}
              />
              {errorsInfo.max_age && errorsInfo.max_age.type === "required" && (
                <span>This is required</span>
              )}
              {errorsInfo.max_age && errorsInfo.max_age.type === "min" && (
                <span>It needs to be above 18 years old</span>
              )}
              {errorsInfo.max_age && errorsInfo.max_age.type === "max" && (
                <span>It needs to be below 99 years old</span>
              )}
            </label>
          </div>
        </div>

        <label>Select The Relationship Type You Prefer:</label>
        <Select {...registerInfo("relationship_type", { required: true })}>
          <option value="fun">Fun</option>
          <option value="shortterm">Shortterm</option>
          <option value="longterm">Longterm</option>
        </Select>
        {errorsInfo.gender && errorsInfo.gender.type === "required" && (
          <span>This is required</span>
        )}

        <div>
          <label>
            What genders are you interested in when choosing a partner?
          </label>
          <Controller
            name="preferred_genders"
            control={controlInfo}
            defaultValue={[]} // Default value for the genders array
            render={({ field: { onChange } }) => (
              <Dropdown
                label="Select Genders"
                inline
                dismissOnClick={false}
                placement="right"
              >
                {genders.map((gender) => (
                  <Dropdown.Item key={gender}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGenders.includes(gender)}
                        onChange={() => {
                          toggleGender(gender);
                          onChange(selectedGenders); // Update react-hook-form state
                        }}
                        className="mr-2"
                      />
                      <span>{gender}</span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            )}
          />
        </div>

        <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
          Submit
        </button>
      </form>

      <form onSubmit={handleSubmitPhoto(onSubmitPhoto)}>
        <ImageInputCustom name="image" control={control} />
        <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
