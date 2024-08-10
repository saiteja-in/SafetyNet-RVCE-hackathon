import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Mail, Phone, MapPin, Home, CloudUpload, AlertTriangle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(10, "Invalid mobile number"),
  incidentLocation: z.string().min(1, "Incident location is required"),
  incidentCity: z.string().min(1, "Incident city is required"),
  address: z.string().min(1, "Address is required"),
  severity: z.number().min(1).max(10),
  image: z.string().optional(),
  typeofdisaster: z.string().min(1, "This field is required"),
  imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
});

export type IncidentFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (incidentData: FormData) => void;
  isLoading: boolean;
};

const IncidentReportForm = ({ onSubmit, isLoading }: Props) => {
  const [file, setFile] = useState<File | undefined>();

  const form = useForm<IncidentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      incidentLocation: "",
      incidentCity: "",
      address: "",
      typeofdisaster: "",
      severity: 1,
      image: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
    form.setValue("imageFile", selectedFile); // Update form state
  };

  const onFormSubmit = (data: IncidentFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("incidentLocation", data.incidentLocation);
    formData.append("incidentCity", data.incidentCity);
    formData.append("typeofdisaster", data.typeofdisaster);
    formData.append("address", data.address);
    formData.append("severity", data.severity.toString());

    if (data.image) {
      formData.append("image", data.image);
    }

    if (file) {
      formData.append("imageFile", file);
    }

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">Incident Report</h2>
          <FormDescription className="text-gray-500 mt-2">
            Please provide details about the incident you wish to report.
          </FormDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  Mobile Number
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="incidentLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  Incident Location
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="incidentCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-orange-500" />
                  Incident City
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-teal-500" />
                  Address
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeofdisaster"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Type of Disaster
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Incident Severity (1-10)
                </FormLabel>
                <FormControl>
                  <Controller
                    name="severity"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                        className="text-blue-600"
                      />
                    )}
                  />
                </FormControl>
                <FormDescription className="text-gray-500">
                  1 is least severe, 10 is most severe
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <CloudUpload className="w-5 h-5 text-gray-600" />
                Upload Image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-gray-50 border-gray-300"
                />
              </FormControl>
              <FormDescription className="text-gray-500">
                Upload an image related to the incident (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("image") && (
          <div className="w-full flex justify-center">
            <img
              src={form.watch("image")}
              alt="Uploaded"
              className="max-w-full max-h-60 object-contain mt-4 rounded-lg shadow"
            />
          </div>
        )}

        <div className="text-center">
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default IncidentReportForm;
