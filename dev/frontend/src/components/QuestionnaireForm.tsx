import { IP_SERVER } from "@/config/constants";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { DatePicker } from '@mantine/dates';
import { MultiSelect, NumberInput } from "@mantine/core";

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
        DateOfBirth: Date
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
                        value={field.value || null}
                    />
                )}
            />
            <div>
                <label>Age preference range:</label>
                <div className="flex flex-row">
                    <Controller
                        name="min_age"
                        control={control}
                        defaultValue={18}
                        render={({field})=>(
                            <NumberInput
                            {...field}
                            label="Minimum Age"
                            placeholder=""
                            min={18}
                            max={99}
                            step={1}
                            onChange={(value)=>field.onChange(value)}
                            />
                        )}
                    />
                    <Controller
                        name="max_age"
                        control={control}
                        defaultValue={99}
                        render={({field})=>(
                            <NumberInput
                                {...field}
                                label="Maximum Age"
                                placeholder="99"
                                min={18}
                                max={99}
                                step={1}
                                onChange={(value)=>field.onChange(value)}
                            />
                        )}
                    />
                </div>
            </div>
            <Controller
                name="prefered_gender"
                control={control}
                defaultValue={[]}
                render={({field})=>(
                    <MultiSelect
                        {...field}
                        data={gender}
                        label="Which type of relationship are you looking for"
                        placeholder="gender"
                        onChange={field.onChange}
                        value={field.value}
                    />
                )}
            />
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


export default QuestionnaireForm