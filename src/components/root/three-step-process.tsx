import { FiFileText } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { GoZap } from "react-icons/go";

export default function ThreeStepProcess() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Simple 3-Step Process
          </h2>
          <p className="text-xl text-muted-foreground">
            From submission to resolution in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
              <FiFileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              1. Submit Complaint
            </h3>
            <p className="text-muted-foreground">
              Fill out our simple form with details about your issue. Our AI
              helps categorize it automatically.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 gradient-2 rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium group-hover:scale-110 transition-transform">
              <IoAlertCircleOutline className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              2. Track Progress
            </h3>
            <p className="text-muted-foreground">
              Get real-time updates as your complaint moves through the
              resolution process with full transparency.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
              <GoZap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              3. Get Resolution
            </h3>
            <p className="text-muted-foreground">
              Receive timely resolution with detailed feedback and the option to
              rate your experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
