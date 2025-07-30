import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { CiClock2 } from "react-icons/ci";

export default function AutomatedEscalationSystem() {
  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Automated Escalation System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No complaint gets forgotten. Our intelligent escalation system
            ensures timely resolution by automatically moving unresolved issues
            to higher authorities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Department Level
                </h3>
                <p className="text-muted-foreground">
                  Initially assigned to the relevant department admin. Standard
                  resolution time:{" "}
                  <span className="text-primary font-medium">
                    3-5 business days
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-warning/20 transition-colors">
                <span className="text-yellow-500/60 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Campus Level
                </h3>
                <p className="text-muted-foreground">
                  Auto-escalated to Campus Admin if unresolved within timeframe.
                  Priority resolution time:{" "}
                  <span className="text-yellow-500/60 font-medium">
                    2-3 business days
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                <span className="text-destructive font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Super Admin Level
                </h3>
                <p className="text-muted-foreground">
                  Final escalation to Super Admin for critical issues.
                  Guaranteed resolution:{" "}
                  <span className="text-destructive font-medium">
                    24-48 hours
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <CiClock2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Smart Time Tracking
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/80 rounded-lg">
                  <span className="text-sm font-medium text-foreground">
                    Auto-escalation triggers
                  </span>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/80 rounded-lg">
                  <span className="text-sm font-medium text-foreground">
                    Priority notifications
                  </span>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Real-time
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/80 rounded-lg">
                  <span className="text-sm font-medium text-foreground">
                    Manual escalation option
                  </span>
                  <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                    Available
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-large border-0 text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
              <div className="text-sm text-muted-foreground">
                Issues resolved before escalation
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-large border-0 text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-chart-4 mb-2">1.2%</div>
              <div className="text-sm text-muted-foreground">
                Escalated to campus level
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-large border-0 text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-destructive mb-2">
                0.3%
              </div>
              <div className="text-sm text-muted-foreground">
                Require super admin intervention
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
