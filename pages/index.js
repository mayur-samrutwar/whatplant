import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
  Textarea,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Button } from "@headlessui/react";
import PlantCardLoader from "@/components/PlantCardLoader";
import * as React from "react";
import OpenAI from "openai";

export default function Example() {
  const openai = new OpenAI({
    organization: "org-fFj0p09pfHYguM6ocWXZ6IGR",
    project: "proj_Pek9vt9Iw4ljK29sgOhvWrCR",
    apiKey: "sk-proj-7vgWtHUPk9ra9Ily1f2PT3BlbkFJdDGkfz1lM2nBQ6HWOMow",
    dangerouslyAllowBrowser: true,
  });

  const [isPlantGenerating, setIsPlantGenerating] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const [plants, setPlants] = React.useState(null);
  const [plantMeta, setPlantMeta] = React.useState(null);
  const [formData, setFormData] = React.useState({
    city: "",
    room: "Bedroom",
    sunlightHours: 2,
    outstationFrequency: "Once a week",
    objective: "Flowers",
    extraInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generatePlants = async () => {
    setIsOpen(true)
    setIsPlantGenerating(true);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a house plant expert with expertise in native flora.",
        },
        {
          role: "user",
          content: `I want to purchase an indoor plant. prioritize each information. my main objective(priority) to buy plant is - ${formData.objective}. I live in ${formData.city}. I want to keep a plant in my ${formData.room} which gets ${formData.sunlightHours} hrs of sunlight in a day. my outstation frequency is, ${formData.outstationFrequency}. some extra info - ${formData.extraInfo}. based on my inputs, suggest me the native plant species, watering frequency, maintainance tip in a short line in json format with keys plantName, waterFreq and tip`,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    const plantData = JSON.parse(completion.choices[0].message.content);
    setPlantMeta(plantData);

    const prompt = `generate a hyper-realistic image of ${plantData.plantName}. the pot should be of greyish shade and the background should be complete white with no shadows and curves.`;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data[0].url;
    setPlants(image_url);
    setIsPlantGenerating(false);
  };

  React.useEffect(() => {
    if (plantMeta) {
      console.log(plantMeta);
    }
  }, [plantMeta]);

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white">
      <div className={`w-full max-w-2xl px-4 ${inter.className}`}>
        <p className="text-center py-12 font-black text-xl">WhatPlant?</p>

        <Fieldset className="grid grid-cols-2 gap-4 border rounded-xl bg-[#f7f7f7] p-6 sm:p-10">
          <Field>
            <Label className="text-sm/6 font-medium text-black">Your city</Label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={clsx(
                "mt-3 block w-full rounded-lg bg-white border border-gray-200 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
              placeholder="Pune, India"
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Preferred Room</Label>
            <Description className="text-sm/6 text-black/50"></Description>
            <div className="relative">
              <Select
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border border-gray-200 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
              >
                <option>Bedroom</option>
                <option>Living Room</option>
                <option>Kitchen</option>
                <option>Bathroom</option>
                <option>Balcony</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Objective</Label>
            <Description className="text-sm/6 text-black/50"></Description>
            <div className="relative">
              <Select
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border border-gray-200 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
              >
                <option>Mood Refresh</option>
                <option>Air Purifier</option>
                <option>Flowers</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Hours of Sunlight</Label>
            <Description className="text-sm/6 text-black/50"></Description>
            <div className="relative">
              <Select
                name="sunlightHours"
                value={formData.sunlightHours}
                onChange={handleInputChange}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border border-gray-200 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
              >
                {[...Array(25).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Outstation Frequency</Label>
            <Description className="text-sm/6 text-black/50"></Description>
            <div className="relative">
              <Select
                name="outstationFrequency"
                value={formData.outstationFrequency}
                onChange={handleInputChange}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border border-gray-200 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
              >
                <option>Once a week</option>
                <option>Every weekend</option>
                <option>Once in a month</option>
                <option>One week in a month</option>
                <option>I'm not sure</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Extra Information</Label>
            <Textarea
              name="extraInfo"
              value={formData.extraInfo}
              onChange={handleInputChange}
              className={clsx(
                "mt-3 block w-full resize-none rounded-lg border border-gray-200 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
              rows={3}
              placeholder="I have AC everywhere, even in my bathroom"
            />
          </Field>
        </Fieldset>
      </div>
      <Button
        onClick={generatePlants}
        className="mt-8 rounded bg-gray-800 py-2 px-4 text-sm text-white data-[hover]:bg-gray-700 data-[active]:bg-sky-700"
      >
        Suggest a Plant
      </Button>
      {
isOpen && 
      
      <div className="absolute top-0 left-0 w-screen h-screen fixed flex justify-center items-center bg-white">
  {isPlantGenerating ? (
    <PlantCardLoader />
  ) : plants ? (<div>
    <div className="flex border bg-white">
      <div>
        <img className="w-60 h-60" src={plants} alt={plantMeta.plantName} />
      </div>
      <div className="p-6 max-w-md">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="text-2xl font-bold">{plantMeta.plantName}</div>
            <div className="mt-4">{plantMeta.tip}</div>
          </div>
          <div className="flex text-gray-700 items-center mt-4">
            <svg className="mr-4" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
              <path fill="currentColor" d="M265.12 60.12a12 12 0 0 0-18.23 0C215.23 97.15 112 225.17 112 320c0 88.37 55.64 144 144 144s144-55.63 144-144c0-94.83-103.23-222.85-134.88-259.88M272 412a12 12 0 0 1-11.34-16a11.89 11.89 0 0 1 11.41-8A60.06 60.06 0 0 0 332 328.07a11.89 11.89 0 0 1 8-11.41A12 12 0 0 1 356 328a84.09 84.09 0 0 1-84 84"></path>
            </svg>
            {plantMeta.waterFreq}
          </div>
        </div>
      </div>
    </div><div className="">      <Button
        onClick={()=>setIsOpen(false)}
        className="mt-8 rounded bg-gray-800 py-2 px-4 text-sm text-white data-[hover]:bg-gray-700 data-[active]:bg-sky-700"
      >
        Close
      </Button></div></div>
  ) : null}
</div>}

    </div>
  );
}
