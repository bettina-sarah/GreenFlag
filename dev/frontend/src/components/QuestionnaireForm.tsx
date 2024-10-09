import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import {Datepicker, Checkbox, Label, Select, TextInput, Dropdown } from "flowbite-react";

const QuestionnaireForm = () => {
    const navigate = useNavigate(); //hook

    const genders = ["Male", "Female", "Non-Binary", "Other"];
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

    const toggleGender = (gender: string) => {
        setSelectedGenders((prev) => 
            prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
        );
    };
    type FormData = {
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
        // Infos
        DateOfBirth: Date | null
        gender: string
        height: number
        religion: string
        want_kids: boolean
        city: string
        // Preferences
        min_age: number
        max_age: number
        relationship_type: string
        prefered_genders: string[]
    }

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()
    const onSubmit = handleSubmit( async (data)=> {
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

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-between m-2 overflow-visible">
            <div className="flex flex-col space-y-4 p-3 m-4">
                <div className="flex items-center gap-2">
                    <Checkbox id="hiking" {...register("hiking")}/>
                    <Label htmlFor="hiking">Hiking</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="yoga" {...register("yoga")} />
                    <Label htmlFor="yoga">Yoga or Meditation</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="photography" {...register("photography")} />
                    <Label htmlFor="photography">Photography</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="cooking" {...register("cooking")} />
                    <Label htmlFor="cooking">Cooking or Baking</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="traveling" {...register("traveling")} />
                    <Label htmlFor="traveling">Traveling</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="reading" {...register("reading")} />
                    <Label htmlFor="reading">Reading Books</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="videogaming" {...register("videogaming")} />
                    <Label htmlFor="videogaming">Video Gaming</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="biking" {...register("biking")} />
                    <Label htmlFor="biking">Biking or Cycling</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="running" {...register("running")} />
                    <Label htmlFor="running">Running or Jogging</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="watchingmovies" {...register("watchingmovies")} />
                    <Label htmlFor="watchingmovies">Watching Movies or TV Shows</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="workingout" {...register("workingout")} />
                    <Label htmlFor="workingout">Working Out / Fitness</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="dancing" {...register("dancing")} />
                    <Label htmlFor="dancing">Dancing</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="playinginstrument" {...register("playinginstrument")} />
                    <Label htmlFor="playinginstrument">Playing Musical Instrument</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="attendingconcerts" {...register("attendingconcerts")} />
                    <Label htmlFor="attendingconcerts">Attending Concerts or Festivals</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="painting" {...register("painting")} />
                    <Label htmlFor="painting">Painting or Drawing</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="volunteering" {...register("volunteering")} />
                    <Label htmlFor="volunteering">Volunteering</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="playingsports" {...register("playingsports")} />
                    <Label htmlFor="playingsports">Playing Sports</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="crafting" {...register("crafting")} />
                    <Label htmlFor="crafting">Crafting or DIY Projects</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="petlover" {...register("petlover")} />
                    <Label htmlFor="petlover">Pet Lover or Animal Care</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="learningnewlanguage" {...register("learningnewlanguage")} />
                    <Label htmlFor="learningnewlanguage">Learning New Languages</Label>
                </div>
            </div>

            <label>Select Your Date of Birth:</label>
            <Controller
                name="DateOfBirth"
                control={control}
                defaultValue={new Date()}
                render={({field}) =>(
                    <Datepicker
                    {...field}
                    onChange={(date: Date | null)=>field.onChange(date)}
                    />
                )}
            />
            {errors.DateOfBirth && errors.DateOfBirth.type === "required" && (
                <span>This is required</span>
            )}
            
            <label>Select Your Gender:</label>
            <Select {...register("gender", {required: true})}>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="x">Non-binary</option>
                <option value="o">Other</option>
            </Select>
            {errors.gender && errors.gender.type === "required" && (
                <span>This is required</span>
            )}


            <label>Enter Your Height (in cm):</label>
            <TextInput {...register("height", {required: true})} type="number" placeholder="e.g., 175"/>
            {errors.height && errors.height.type === "required" && (
                <span>This is required</span>
            )}

            <label>Select Your Religion or Belief:</label>
            <Select {...register("religion", {required: true})}>
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
            {errors.religion && errors.religion.type === "required" && (
                <span>This is required</span>
            )}

            <div className="flex items-center gap-2">
                    <Label htmlFor="want_kids">Do you want kids? (check for yes)</Label>
                    <Checkbox {...register("want_kids", {required: true})}/>
            </div>
            
            <label>Insert Your City:</label>
            <TextInput {...register("city",{required: true, maxLength: 50})} maxLength={50}/>
            {errors.city && errors.city.type === "required" && (
                <span>This is required</span>
            )}
            {errors.city && errors.city.type === "maxLength" && (
                <span>Max length exceeded</span>
            )}

            <div className="flex flex-col">
                <label>Age preference range:</label>
                <div className="flex flex-row justify-evenly">
                    <label>Prefered minimum age:
                        <input type="number" {...register("min_age",{min: 18, max: 99})} min={18} max={99} defaultValue={18}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                            errors.max_age ? "border-red-500" : ""}`}
                        />
                        {errors.min_age && errors.min_age.type === "required" && (
                            <span>This is required</span>
                        )}
                        {errors.min_age && errors.min_age.type === "min" && (
                            <span>It needs to be above 18 years old</span>
                        )}
                        {errors.min_age && errors.min_age.type === "max" && (
                            <span>It needs to be below 99 years old</span>
                        )}
                    </label>
                    <label>Prefered maximum age:
                        <input type="number" {...register("max_age",{min: 18, max: 99})} min={18} max={99} defaultValue={60}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                            errors.max_age ? "border-red-500" : ""}`}
                        />
                        {errors.max_age && errors.max_age.type === "required" && (
                            <span>This is required</span>
                        )}
                        {errors.max_age && errors.max_age.type === "min" && (
                            <span>It needs to be above 18 years old</span>
                        )}
                        {errors.max_age && errors.max_age.type === "max" && (
                            <span>It needs to be below 99 years old</span>
                        )}
                    </label>
                </div>
            </div>

            <label>Select The Relationship Type You Prefer:</label>
            <Select {...register("relationship_type", {required: true})}>
                <option value="fun">Fun</option>
                <option value="shortterm">Shortterm</option>
                <option value="longterm">Longterm</option>
            </Select>
            {errors.gender && errors.gender.type === "required" && (
                <span>This is required</span>
            )}

            <div>
                <label>What genders are you interested in when choosing a partner?</label>
                <Controller
                    name="prefered_genders"
                    control={control}
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
    );
}

export default QuestionnaireForm;