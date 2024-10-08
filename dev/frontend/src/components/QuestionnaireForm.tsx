import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { DatePicker } from '@mantine/dates';
import { NumberInput } from "@mantine/core";

const RegisterForm = () => {
    const navigate = useNavigate(); //hook

    enum Relationship {
        fun,
        shortterm,
        longterm
    }

    enum Gender {
        m,
        f,
        x
    }

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
        DateOfBirth: Date
        min_age: bigint
        max_age: bigint
        relationship_type: Relationship
        prefered_gender: Gender
        height: bigint
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
            const answer = await axios.post(IP_SERVER+'/create_account',data)
            if (answer.data){
                console.log(answer);
                navigate('/login')
            }
        } catch(error){
            console.error('Error during account creation:',error)
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
            <label>Date of birth:</label>
            <Controller
                name="DateOfBirth"
                control={control}
                defaultValue={new Date(2006, 1)}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        value={field.value || null} // Ensure the value is either a date or null
                    />
                )}
            />
            <div>
                <label>Age preference range:</label>
                <NumberInput></NumberInput>
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

};


export default RegisterForm