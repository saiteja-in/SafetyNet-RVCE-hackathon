import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(10, "Invalid mobile number"),
  incidentLocation: z.string().min(1, "Incident location is required"),
  incidentCity: z.string().min(1, "Incident city is required"),
  address: z.string().min(1, "Address is required"),
  severity: z.number().min(1).max(10),
  image: z.string().optional(),
  imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
});

export type IncidentFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (incidentData: FormData) => void;
  isLoading: boolean;
};

const IncidentReportForm = ({ onSubmit, isLoading }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<IncidentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      incidentLocation: "",
      incidentCity: "",
      address: "",
      severity: 5,
      image: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
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
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6 bg-gray-50 rounded-lg p-6 md:p-10">
        <div>
          <h2 className="text-2xl font-bold">Incident Report</h2>
          <FormDescription>
            Please provide details about the incident you wish to report.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Incident Location</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Incident City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Incident Severity (1-10)</FormLabel>
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
                      className="bg-black text-black"
                    />
                  )}
                />
              </FormControl>
              <FormDescription>
                1 is least severe, 10 is most severe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription>
                Upload an image related to the incident (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("image") && (
          <div className="w-full flex justify-center">
            <img src={form.watch("image")} alt="Uploaded" className="max-w-full max-h-60 object-contain" />
          </div>
        )}

        <Button type="submit" className="bg-blue-500 text-white" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Form>
  );
};

export default IncidentReportForm;
