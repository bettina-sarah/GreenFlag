import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import {Datepicker } from "flowbite-react";
import { Input } from "./ui/input";

const QuestionnaireForm = () => {
    const navigate = useNavigate(); //hook

    const relationship =  [
        "fun",
        "shortterm",
        "longterm"
    ]

    const gender = [
        {value: 'm', label: 'Men'},
        {value: 'f', label: 'Women'},
        {value: 'x', label: 'Non-binary'},
    ]

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
        min_age: number
        max_age: number
        relationship_type: string
        prefered_gender: string[]
        height: number
        religion: string
        want_kids: boolean
        city: string
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
        <form onSubmit={onSubmit} className="flex flex-col justify-between">
            <div>
                <label>
                    <input type="checkbox" {...register("Hiking")} />
                    Hiking
                </label>
                    <label>
                    <input type="checkbox" {...register("YogaOrMeditation")} />
                    YogaOrMeditation
                </label>
                <label>
                    <input type="checkbox" {...register("Photography")} />
                    Photography
                </label>
                <label>
                    <input type="checkbox" {...register("CookingOrBaking")} />
                    CookingOrBaking
                </label>
                <label>
                    <input type="checkbox" {...register("Traveling")} />
                    Traveling
                </label>
                <label>
                    <input type="checkbox" {...register("ReadingBooks")} />
                    ReadingBooks
                </label>
                <label>
                    <input type="checkbox" {...register("VideoGaming")} />
                    VideoGaming
                </label>
                <label>
                    <input type="checkbox" {...register("BikingOrCycling")} />
                    BikingOrCycling
                </label>
                <label>
                    <input type="checkbox" {...register("RunningOrJogging")} />
                    RunningOrJogging
                </label>
                <label>
                    <input type="checkbox" {...register("WatchingMoviesOrTVShows")} />
                    WatchingMoviesOrTVShows
                </label>
                <label>
                    <input type="checkbox" {...register("WorkingOutFitness")} />
                    WorkingOutFitness
                </label>
                <label>
                    <input type="checkbox" {...register("Dancing")} />
                    Dancing
                </label>
                <label>
                    <input type="checkbox" {...register("PlayingMusicalInstrument")} />
                    PlayingMusicalInstrument
                </label>
                <label>
                    <input type="checkbox" {...register("AttendingConcertsOrFestivals")} />
                    AttendingConcertsOrFestivals
                </label>
                <label>
                    <input type="checkbox" {...register("PaintingOrDrawing")} />
                    PaintingOrDrawing
                </label>
                <label>
                    <input type="checkbox" {...register("Volunteering")} />
                    Volunteering
                </label>
                <label>
                    <input type="checkbox" {...register("PlayingSports")} />
                    PlayingSports
                </label>
                <label>
                    <input type="checkbox" {...register("CraftingOrDIYProjects")} />
                    CraftingOrDIYProjects
                </label>
                <label>
                    <input type="checkbox" {...register("PetLoverOrAnimalCare")} />
                    PetLoverOrAnimalCare
                </label>
                <label>
                    <input type="checkbox" {...register("LearningNewLanguages")} />
                    LearningNewLanguages
                </label>
            </div>
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
            <div className="flex flex-col">
                <label>Age preference range:</label>
                <label>Prefered minimum age:
                    <input type="number" {...register("min_age",{min: 18, max: 99})} min={18} max={99}/>
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
                    <input type="number" {...register("max_age",{min: 18, max: 99})} min={18} max={99}/>
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
            <label>City:</label>
            <input {...register("city",{required: true, maxLength: 50})} />
            {errors.city && errors.city.type === "required" && (
                <span>This is required</span>
            )}
            {errors.city && errors.city.type === "maxLength" && (
                <span>Max length exceeded</span>
            )}
            <button className="bg-teal-600 p-1 rounded-md text-white" type="submit">
                Login
            </button>

        </form>
    );
}

export default QuestionnaireForm;