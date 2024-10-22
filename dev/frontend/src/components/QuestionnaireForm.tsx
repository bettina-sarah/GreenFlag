import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import {Datepicker, Checkbox, Label, Select, TextInput, Dropdown, Textarea } from "flowbite-react";
import ImageInputCustom from "./ImageInput";
// https://marmelab.com/react-admin/ImageInput.html

const QuestionnaireForm = () => {
    const navigate = useNavigate(); //hook

    const genders = ["Male", "Female", "Non-Binary", "Other"];
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

    const toggleGender = (gender: string) => {
        setSelectedGenders((prev) => 
            prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
        );
    };
    type FormDataHobbies = {
        // Activities
        hiking: boolean
        yoga: boolean
        photography: boolean
        cooking: boolean
        traveling: boolean
        reading: boolean
        videogaming: boolean
        biking: boolean
        running: boolean
        watchingmovies: boolean
        workingout: boolean
        dancing: boolean
        playinginstrument: boolean
        attendingconcerts: boolean
        painting: boolean
        volunteering: boolean
        playingsports: boolean //(e.g., Soccer, Tennis, Basketball)
        crafting: boolean
        petlover: boolean
        learningnewlanguage: boolean
    }

    type FormDataInfo = {
        // Infos
        date_of_birth: Date | null
        gender: string
        height: number
        religion: string
        want_kids: boolean
        city: string
        bio: string
        // Preferences
        min_age: number
        max_age: number
        relationship_type: string
        preferred_genders: string[]
    }

    // type FormDataPhotos = {
    //     Photos: File[] | null
    // }

    interface FormDataPhoto {
        image: File | null
    }

    const {
        register: registerHobbies,
        handleSubmit :handleSubmitHobbies,
        formState: { errors: errorsHobbies },
    } = useForm<FormDataHobbies>()
    const onSubmitFormHobbies = handleSubmitHobbies( async (data)=> {
        try{
            const answer = await axios.post(IP_SERVER+'/hobbies',data)
            if (answer.data){
                console.log(answer);
                navigate('/matching')
            }
        } catch(error){
            console.error('Error during account modification:',error)
        }
    } )

    const {
        register: registerInfo,
        control: controlInfo,
        handleSubmit: handleSubmitInfo,
        formState: { errors: errorsInfo },
    } = useForm<FormDataInfo>()
    const onSubmitFormInfo = handleSubmitInfo( async (data)=> {
        try{
            const answer = await axios.post(IP_SERVER+'/questionnaire',data)
            if (answer.data){
                console.log(answer);
                navigate('/matching')
            }
        } catch(error){
            console.error('Error during account modification:',error)
        }
    } )

    // const {
    //     control: controlPhotos,
    //     handleSubmit: handleSubmitPhotos,
    //     formState: { errors: errorsPhotos },
    // } = useForm<FormDataPhotos>()
    // const onSubmitFormPhotos = handleSubmitPhotos( async (data)=> {
    //     try{
    //         const answer = await axios.post(IP_SERVER+'/questionnaire',data)
    //         if (answer.data){
    //             console.log(answer);
    //             navigate('/matching')
    //         }
    //     } catch(error){
    //         console.error('Error during account modification:',error)
    //     }
    // } )

    const {control, handleSubmit: handleSubmitPhoto} = useForm<FormDataPhoto>();

    const onSubmitPhoto: SubmitHandler<FormDataPhoto> = async (data) => {
        
        try{
            const formData = new FormData();
            if(data.image){
                formData.append('image',data.image);
                const answer = await axios.post(IP_SERVER+'/photo',formData)
                if (answer.data){
                    console.log(answer);
                    console.log(data)
                }
            }    
        } catch(error){
            console.error('Error during account modification:',error)
        }
    }


    return (
        <div className="flex flex-col justify-between m-2 overflow-visible">

            <form onSubmit={onSubmitFormHobbies} >
                <div className="flex flex-col space-y-4 p-3 m-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="hiking" {...registerHobbies("hiking")}/>
                        <Label htmlFor="hiking">Hiking</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="yoga" {...registerHobbies("yoga")} />
                        <Label htmlFor="yoga">Yoga or Meditation</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="photography" {...registerHobbies("photography")} />
                        <Label htmlFor="photography">Photography</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="cooking" {...registerHobbies("cooking")} />
                        <Label htmlFor="cooking">Cooking or Baking</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="traveling" {...registerHobbies("traveling")} />
                        <Label htmlFor="traveling">Traveling</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="reading" {...registerHobbies("reading")} />
                        <Label htmlFor="reading">Reading Books</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="videogaming" {...registerHobbies("videogaming")} />
                        <Label htmlFor="videogaming">Video Gaming</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="biking" {...registerHobbies("biking")} />
                        <Label htmlFor="biking">Biking or Cycling</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="running" {...registerHobbies("running")} />
                        <Label htmlFor="running">Running or Jogging</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="watchingmovies" {...registerHobbies("watchingmovies")} />
                        <Label htmlFor="watchingmovies">Watching Movies or TV Shows</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="workingout" {...registerHobbies("workingout")} />
                        <Label htmlFor="workingout">Working Out / Fitness</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="dancing" {...registerHobbies("dancing")} />
                        <Label htmlFor="dancing">Dancing</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="playinginstrument" {...registerHobbies("playinginstrument")} />
                        <Label htmlFor="playinginstrument">Playing Musical Instrument</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="attendingconcerts" {...registerHobbies("attendingconcerts")} />
                        <Label htmlFor="attendingconcerts">Attending Concerts or Festivals</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="painting" {...registerHobbies("painting")} />
                        <Label htmlFor="painting">Painting or Drawing</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="volunteering" {...registerHobbies("volunteering")} />
                        <Label htmlFor="volunteering">Volunteering</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="playingsports" {...registerHobbies("playingsports")} />
                        <Label htmlFor="playingsports">Playing Sports</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="crafting" {...registerHobbies("crafting")} />
                        <Label htmlFor="crafting">Crafting or DIY Projects</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="petlover" {...registerHobbies("petlover")} />
                        <Label htmlFor="petlover">Pet Lover or Animal Care</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="learningnewlanguage" {...registerHobbies("learningnewlanguage")} />
                        <Label htmlFor="learningnewlanguage">Learning New Languages</Label>
                    </div>
                </div>

                <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
                    Submit
                </button>
            </form>
            <form  onSubmit={onSubmitFormInfo}>
                <label>Select Your Date of Birth:</label>
                <Controller
                    name="date_of_birth"
                    control={controlInfo}
                    defaultValue={new Date()}
                    render={({field}) =>(
                        <Datepicker
                        {...field}
                        onChange={(date: Date | null)=>field.onChange(date)}
                        />
                    )}
                />
                {errorsInfo.date_of_birth && errorsInfo.date_of_birth.type === "required" && (
                    <span>This is required</span>
                )}
                
                <label>Select Your Gender:</label>
                <Select {...registerInfo("gender", {required: true})}>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="x">Non-binary</option>
                    <option value="o">Other</option>
                </Select>
                {errorsInfo.gender && errorsInfo.gender.type === "required" && (
                    <span>This is required</span>
                )}


                <label>Enter Your Height (in cm):</label>
                <TextInput {...registerInfo("height", {required: true})} type="number" placeholder="e.g., 175"/>
                {errorsInfo.height && errorsInfo.height.type === "required" && (
                    <span>This is required</span>
                )}

                <label>Select Your Religion or Belief:</label>
                <Select {...registerInfo("religion", {required: true})}>
                    <option value="Atheist">Atheist</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Christian">Christian</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Jewish">Jewish</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Taoist">Taoist</option>
                    <option value="Shinto">Shinto</option>
                    <option value="Confucian">Confucian</option>
                    <option value="Bahai">Bahai</option>
                    <option value="Pagan">Pagan</option>
                    <option value="Agnostic">Agnostic</option>
                    <option value="Other">Other</option>
                </Select>
                {errorsInfo.religion && errorsInfo.religion.type === "required" && (
                    <span>This is required</span>
                )}

                <div className="flex items-center gap-2">
                        <Label htmlFor="want_kids">Do you want kids? (check for yes)</Label>
                        <Checkbox {...registerInfo("want_kids")}/>
                </div>
                
                <label>Insert Your City:</label>
                <TextInput {...registerInfo("city",{required: true, maxLength: 50})} maxLength={50}/>
                {errorsInfo.city && errorsInfo.city.type === "required" && (
                    <span>This is required</span>
                )}
                {errorsInfo.city && errorsInfo.city.type === "maxLength" && (
                    <span>Max length exceeded</span>
                )}

                <label>Tell us a little thing about yourself:</label>
                <Textarea {...registerInfo("bio", {required: true})} required rows={6}/>

                <div className="flex flex-col">
                    <label>Age preference range:</label>
                    <div className="flex flex-row justify-evenly">
                        <label>Prefered minimum age:
                            <input type="number" {...registerInfo("min_age",{min: 18, max: 99})} min={18} max={99} defaultValue={18}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                errorsInfo.max_age ? "border-red-500" : ""}`}
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
                        <label>Prefered maximum age:
                            <input type="number" {...registerInfo("max_age",{min: 18, max: 99})} min={18} max={99} defaultValue={60}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                errorsInfo.max_age ? "border-red-500" : ""}`}
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
                <Select {...registerInfo("relationship_type", {required: true})}>
                    <option value="fun">Fun</option>
                    <option value="shortterm">Shortterm</option>
                    <option value="longterm">Longterm</option>
                </Select>
                {errorsInfo.gender && errorsInfo.gender.type === "required" && (
                    <span>This is required</span>
                )}

                <div>
                    <label>What genders are you interested in when choosing a partner?</label>
                    <Controller
                        name="preferred_genders"
                        control={controlInfo}
                        defaultValue={[]} // Default value for the genders array
                        render={({ field: { onChange } }) => (
                        <Dropdown label="Select Genders" inline dismissOnClick={false} placement="right">
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
            {/* <form onSubmit={onSubmitFormPhotos}>
                <Controller
                    name="Photos"
                    control={controlPhotos}
                    defaultValue={[]}
                    render={({ field }) =>(
                        <ImageInput
                            {...field}
                            multiple
                            accept={{
                                'image/png': ['.png'],
                                'image/jpeg': ['.jpg', '.jpeg'],
                              }}
                            label="Upload an image"
                            maxSize={1024 * 1024}
                            onChange={(event) =>{
                                if (event.target.files){
                                    const files = Array.from(event.target.files)
                                    onChange(files);
                                }
                            }}
                        >
                            {value && value.map((file,index) =>(
                                <ImageField
                                 key={index}
                                 source={URL.createObjectURL(file)}
                                 title={file.name}
                                />
                            ))}
                        </ImageInput>
                    )}
                />

                <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
                    Submit
                </button>
            </form> */}

            <form onSubmit={handleSubmitPhoto(onSubmitPhoto)}>
                <ImageInputCustom name="image" control={control}/>
                <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
                    Submit
                </button>
            </form>
            

        </div>
        
    );
}

export default QuestionnaireForm;