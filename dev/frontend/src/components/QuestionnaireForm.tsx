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
        Hiking: boolean
        YogaOrMeditation: boolean
        Photography: boolean
        CookingOrBaking: boolean
        Traveling: boolean
        ReadingBooks: boolean
        VideoGaming: boolean
        BikingOrCycling: boolean
        RunningOrJogging: boolean
        WatchingMoviesOrTVShows: boolean
        WorkingOutFitness: boolean
        Dancing: boolean
        PlayingMusicalInstrument: boolean
        AttendingConcertsOrFestivals: boolean
        PaintingOrDrawing: boolean
        Volunteering: boolean
        PlayingSports: boolean //(e.g., Soccer, Tennis, Basketball)
        CraftingOrDIYProjects: boolean
        PetLoverOrAnimalCare: boolean
        LearningNewLanguages: boolean
        DateOfBirth: Date | null
        gender: string
        height: number
        religion: string
        want_kids: boolean
        city: string
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
                navigate('/login')
            }
        } catch(error){
            console.error('Error during account modification:',error)
        }
    } )

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-between m-2 overflow-visible">
            <div className="flex flex-col space-y-4 p-3 m-4">
                <div className="flex items-center gap-2">
                    <Checkbox id="Hiking" {...register("Hiking")}/>
                    <Label htmlFor="Hiking">Hiking</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="YogaOrMeditation" {...register("YogaOrMeditation")} />
                    <Label htmlFor="YogaOrMeditation">Yoga or Meditation</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="Photography" {...register("Photography")} />
                    <Label htmlFor="Photography">Photography</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="CookingOrBaking" {...register("CookingOrBaking")} />
                    <Label htmlFor="CookingOrBaking">Cooking or Baking</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="Traveling" {...register("Traveling")} />
                    <Label htmlFor="Traveling">Traveling</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="ReadingBooks" {...register("ReadingBooks")} />
                    <Label htmlFor="ReadingBooks">Reading Books</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="VideoGaming" {...register("VideoGaming")} />
                    <Label htmlFor="VideoGaming">Video Gaming</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="BikingOrCycling" {...register("BikingOrCycling")} />
                    <Label htmlFor="BikingOrCycling">Biking or Cycling</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="RunningOrJogging" {...register("RunningOrJogging")} />
                    <Label htmlFor="RunningOrJogging">Running or Jogging</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="WatchingMoviesOrTVShows" {...register("WatchingMoviesOrTVShows")} />
                    <Label htmlFor="WatchingMoviesOrTVShows">Watching Movies or TV Shows</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="WorkingOutFitness" {...register("WorkingOutFitness")} />
                    <Label htmlFor="WorkingOutFitness">Working Out / Fitness</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="Dancing" {...register("Dancing")} />
                    <Label htmlFor="Dancing">Dancing</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="PlayingMusicalInstrument" {...register("PlayingMusicalInstrument")} />
                    <Label htmlFor="PlayingMusicalInstrument">Playing Musical Instrument</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="AttendingConcertsOrFestivals" {...register("AttendingConcertsOrFestivals")} />
                    <Label htmlFor="AttendingConcertsOrFestivals">Attending Concerts or Festivals</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="PaintingOrDrawing" {...register("PaintingOrDrawing")} />
                    <Label htmlFor="PaintingOrDrawing">Painting or Drawing</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="Volunteering" {...register("Volunteering")} />
                    <Label htmlFor="Volunteering">Volunteering</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="PlayingSports" {...register("PlayingSports")} />
                    <Label htmlFor="PlayingSports">Playing Sports</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="CraftingOrDIYProjects" {...register("CraftingOrDIYProjects")} />
                    <Label htmlFor="CraftingOrDIYProjects">Crafting or DIY Projects</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="PetLoverOrAnimalCare" {...register("PetLoverOrAnimalCare")} />
                    <Label htmlFor="PetLoverOrAnimalCare">Pet Lover or Animal Care</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="LearningNewLanguages" {...register("LearningNewLanguages")} />
                    <Label htmlFor="LearningNewLanguages">Learning New Languages</Label>
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