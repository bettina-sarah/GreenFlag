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
import {
  datePickerTheme,
  selectTheme,
  textAreaTheme,
  textInputTheme,
} from "../theme-flowbite/CustomTheme";
import { toast } from "react-toastify";
// https://marmelab.com/react-admin/ImageInput.html

const QuestionnaireForm = () => {
  const navigate = useNavigate(); //hook

  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) => {
      const updatedState = prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender];

      return updatedState;
    });
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

  const completeProfileAndNavigate = async () => {
    const complete = await checkAndCompleteProfile();
    if (complete) {
      navigate("/matching");
    }
  };

  return (
    <div className="flex flex-col justify-between m-6 overflow-visible">
      <form
        onSubmit={handleSubmitHobbies(async (data: any) => {
          await toast.promise(onSubmitFormHobbies(data), {
            pending: "Promise is pending",
            success: "Hobbies saved!",
            error: "Promise rejected 🤯",
          });

          await completeProfileAndNavigate();
        })}
        className=" bg-primary-color rounded-3xl p-4"
      >
        <label className="mb-2 block w-full text-left text-[1.3rem] text-h1-darkblue">
          Select at least 5 areas of interest:
        </label>
        <div className="flex flex-col space-y-4 p-3">
          {hobbiesKeys.map((hobby, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox
                className=" bg-custom-bg border-secondary-color checked:bg-secondary-color focus:outline-secondary-color"
                id={hobby}
                {...registerHobbies(hobby)}
              />
              <Label className="text-base-text text-lg" htmlFor={hobby}>
                {hobby}
              </Label>
            </div>
          ))}
        </div>

        <button
          className="transition-colors duration-300 bg-custom-bg hover:bg-primary-color
             text-primary-color hover:text-custom-bg border-2 border-custom-bg 
             font-bold py-2 px-4 rounded my-4 mx-6 w-72"
          type="submit"
        >
          Submit
        </button>
      </form>
      <form
        onSubmit={handleSubmitInfo(async (data: any) => {
          await onSubmitFormInfo(data);
          await completeProfileAndNavigate();
        })}
        className="bg-primary-color rounded-3xl p-4 mt-7"
      >
        <div>
          <label className="block text-left text-secondary-color text-lg mb-2">
            Select Your Date of Birth:
          </label>
          <Controller
            name="date_of_birth"
            control={controlInfo}
            defaultValue={new Date()}
            render={({ field }) => (
              <Datepicker
                // puissance tailwind: changer CSS d'une librairie ou tu ne peux pas acceder normalement.
                className="[&_input]:!pl-9 [&_input]:!text-lg [&_svg]:!text-secondary-color"
                {...field}
                onChange={(date: Date | null) => field.onChange(date)}
                minDate={
                  new Date(
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    )
                  )
                }
                maxDate={
                  new Date(
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    )
                  )
                }
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
          <label className="block text-left text-secondary-color text-lg mb-2">
            Select Your Gender:
          </label>
          <Select
            className="[&_select]:!text-lg"
            {...registerInfo("gender", { required: true })}
            color="custom"
            theme={selectTheme}
          >
            {genders.map((gender, index) => (
              <option
                value={gender}
                key={index}
                className="bg-primary-color focus:bg-custom-bg"
              >
                {gender}
              </option>
            ))}
          </Select>
          {errorsInfo.gender && errorsInfo.gender.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <div className="pt-10">
          <label className="block text-left text-secondary-color text-lg mb-2">
            Enter Your Height (in cm):
          </label>
          <TextInput
            {...registerInfo("height", { required: true })}
            type="number"
            placeholder="e.g., 175"
            min={0}
            max={272}
            color="custom"
            theme={textInputTheme}
            className="[&_input]:!text-lg [::-webkit-inner-spin-button]:appearance-none [::-webkit-outer-spin-button]:appearance-none"
          />
          {errorsInfo.height && errorsInfo.height.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <div className="pt-10">
          <label className="block text-left text-secondary-color text-lg mb-2">
            Select Your Religion or Belief:
          </label>
          <Select
            className="[&_select]:!text-lg"
            {...registerInfo("religion", { required: true })}
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
          <Label
            className="block text-left text-secondary-color text-lg"
            htmlFor="want_kids"
          >
            Check box if you want kids
          </Label>
          <Checkbox
            className=" pl-4 bg-custom-bg border-secondary-color checked:bg-secondary-color focus:outline-secondary-color"
            {...registerInfo("want_kids")}
          />
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
          <label className="text-h2-custom">
            Tell us a little thing about yourself:
          </label>
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
        <label className="text-h2-custom">
          Select The Relationship Type You Prefer:
        </label>
        <Select
          {...registerInfo("relationship_type", { required: true })}
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
        <button
          className="transition-colors duration-300 bg-custom-bg hover:bg-primary-color
             text-primary-color hover:text-custom-bg border-2 border-custom-bg 
             font-bold py-2 px-4 rounded my-4 mx-6 w-72"
          type="submit"
        >
          Submit
        </button>
      </form>

      <form
        onSubmit={handleSubmitPhoto(async (data: any) => {
          await onSubmitPhoto(data);
          await completeProfileAndNavigate();
        })}
        className="bg-primary-color rounded-3xl p-4 mt-7"
      >
        <ImageInputCustom name="image" control={control} />
        <button
          className="transition-colors duration-300 bg-custom-bg hover:bg-primary-color
             text-primary-color hover:text-custom-bg border-2 border-custom-bg 
             font-bold py-2 px-4 rounded my-4 mx-6 w-72"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
