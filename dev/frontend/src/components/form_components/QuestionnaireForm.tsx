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
  checkAndCompleteProfile,
} from "../form_submits/QuestionnaireSubmitHandlers";
import { datePickerTheme, selectTheme, textAreaTheme, textInputTheme } from "../theme-flowbite/CustomTheme";
// https://marmelab.com/react-admin/ImageInput.html

const QuestionnaireForm = () => {
  const navigate = useNavigate(); //hook

  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>{
      const updatedState = prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender];

        return updatedState;
    });
  };

  const {
    register: registerHobbies,
    handleSubmit: handleSubmitHobbies
  } = useForm<FormDataHobbies>();

  const {
    register: registerInfo,
    control: controlInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo },
  } = useForm<FormDataInfo>();

  const { control, handleSubmit: handleSubmitPhoto } = useForm<FormDataPhoto>();

  const completeProfileAndNavigate = async () => {
    const complete = await checkAndCompleteProfile();
    if (complete) {
      navigate("/matching");
    }
  };

  return (
    <div className="flex flex-col justify-between m-6 overflow-visible">
      <form
        onSubmit={handleSubmitHobbies(async (data:FormDataHobbies) => {
          await onSubmitFormHobbies(data);
          await completeProfileAndNavigate();
        })}
        className=" bg-primary-color rounded-3xl p-4"
      >
        <label className="text-base text-h1-custom">Select at least 5 centers of interest:</label>
        <div className="flex flex-col space-y-4 p-3">
          {hobbiesKeys.map((hobby, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox className="bg-custom-bg border-secondary-color checked:bg-secondary-color focus:outline-secondary-color" id={hobby} {...registerHobbies(hobby)} />
              <Label className="text-base-text" htmlFor={hobby}>{hobby}</Label>
            </div>
          ))}
        </div>

        <button className="bg-secondary-color p-1 min-h-8 min-w-24 rounded-lg text-white" type="submit">
          Submit
        </button>
      </form>
      <form
        onSubmit={handleSubmitInfo(async (data:FormDataInfo) => {
          await onSubmitFormInfo(data);
          await completeProfileAndNavigate();
        })}
        className="bg-primary-color rounded-3xl p-4 mt-7"
      >

        <div>
          <label className="text-h2-custom">Select Your Date of Birth:</label>
          <Controller
            name="date_of_birth"
            control={controlInfo}
            defaultValue={new Date()}
            render={({ field }) => (
              <Datepicker
                {...field}
                onChange={(date: Date | null) => field.onChange(date)}
                minDate={new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))}
                maxDate={new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))}
                color="custom"
                theme={datePickerTheme}
              />
            )}
          />
          {errorsInfo.date_of_birth &&
            errorsInfo.date_of_birth.type === "required" && (
              <span>This is required</span>
          )}
        </div>

        <div className="pt-10">
          <label className="text-h2-custom">Select Your Gender:</label>
          <Select 
          {...registerInfo("gender", { required: true })}
          color="custom"
          theme={selectTheme}
          >
            {genders.map((gender, index) => (
              <option value={gender} key={index} className="bg-primary-color focus:bg-custom-bg">
                {gender}
              </option>
            ))}
          </Select>
          {errorsInfo.gender && errorsInfo.gender.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="pt-10">
          <label className="text-h2-custom">Enter Your Height (in cm):</label>
          <TextInput
            {...registerInfo("height", { required: true })}
            type="number"
            placeholder="e.g., 175"
            min={0}
            max={272}
            color="custom"
            theme={textInputTheme}
            className=" [::-webkit-inner-spin-button]:appearance-none [::-webkit-outer-spin-button]:appearance-none"
          />
          {errorsInfo.height && errorsInfo.height.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="pt-10">
          <label className="text-h2-custom">Select Your Religion or Belief:</label>
          <Select {...registerInfo("religion", { required: true })}
          color="custom"
          theme={selectTheme}
          >
            {religions.map((religion, index) => (
              <option value={religion} key={index}>
                {religion}
              </option>
            ))}
          </Select>
          {errorsInfo.religion && errorsInfo.religion.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-10">
          <Label className="text-h2-custom" htmlFor="want_kids">Do you want kids? (check for yes)</Label>
          <Checkbox className="bg-custom-bg border-secondary-color checked:bg-secondary-color focus:outline-secondary-color" {...registerInfo("want_kids")} />
        </div>

        <div className="pt-10">
          <label className="text-h2-custom">Insert Your City:</label>
          <TextInput
            {...registerInfo("city", { required: true, maxLength: 50 })}
            maxLength={50}
            color="custom"
            theme={textInputTheme}
          />
          {errorsInfo.city && errorsInfo.city.type === "required" && (
            <span>This is required</span>
          )}
          {errorsInfo.city && errorsInfo.city.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </div>

        <div className="pt-10">
          <label className="text-h2-custom">Tell us a little thing about yourself:</label>
          <Textarea
            {...registerInfo("bio", { required: true })}
            required
            rows={6}
            color="custom"
            theme={textAreaTheme}
          />
        </div>

        <div className="flex flex-col pt-10 pb-10">
          <label className="text-h2-custom">Age preference range:</label>
          <div className="flex flex-row justify-evenly pt-4">
            <label className="text-h2-custom">
              Prefered minimum age:
              <input
                type="number"
                {...registerInfo("min_age", { min: 18, max: 99 })}
                min={18}
                max={99}
                defaultValue={18}
                className={`bg-custom-bg border border-secondary-color text-base-text text-sm rounded-lg focus:ring-secondary-color focus:border-secondary-color block w-full p-2.5 ${
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
            <label className="text-h2-custom pl-4">
              Prefered maximum age:
              <input
                type="number"
                {...registerInfo("max_age", { min: 18, max: 99 })}
                min={18}
                max={99}
                defaultValue={60}
                className={`bg-custom-bg border border-secondary-color text-base-text text-sm rounded-lg focus:ring-secondary-color focus:border-secondary-color block w-full p-2.5 ${
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

        <label className="text-h2-custom">Select The Relationship Type You Prefer:</label>
        <Select {...registerInfo("relationship_type", { required: true })}
        color="custom"
        theme={selectTheme}
        >
          <option value="fun">Fun</option>
          <option value="shortterm">Shortterm</option>
          <option value="longterm">Longterm</option>
        </Select>
        {errorsInfo.gender && errorsInfo.gender.type === "required" && (
          <span>This is required</span>
        )}

        <div className="pt-10">
          <label className="text-h2-custom">
            What genders are you interested in when choosing a partner?
          </label>
          <Controller
            name="preferred_genders"
            control={controlInfo}
            defaultValue={[]} // Default value for the genders array
            render={({ field: { onChange } }) => (
              <Dropdown
                label={<label className="text-h2-custom">Select Genders</label>}
                inline
                dismissOnClick={false}
                placement="right"
                className="text-h2-custom bg-primary-color border-secondary-color"
              >
                {genders.map((gender) => (
                  <Dropdown.Item key={gender} className="focus:bg-custom-bg">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGenders.includes(gender)}
                        onChange={() => {
                          toggleGender(gender);
                          onChange([...selectedGenders, gender]); // Update react-hook-form state
                        }}
                        className="bg-custom-bg border-secondary-color checked:bg-secondary-color focus:outline-secondary-color rounded-sm"
                      />
                      <span className="ml-2 text-base-text">{gender}</span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            )}
          />
        </div>

        <button className="bg-secondary-color mt-5 p-1 min-h-8 min-w-24 rounded-lg text-white" type="submit">
          Submit
        </button>
      </form>

      <form
        onSubmit={handleSubmitPhoto(async (data:FormDataPhoto) => {
          await onSubmitPhoto(data);
          await completeProfileAndNavigate();
        })}
        className="bg-primary-color rounded-3xl p-4 mt-7"
      >
        <ImageInputCustom name="image" control={control} />
        <button className="bg-secondary-color p-1 min-h-8 min-w-24 rounded-lg text-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
