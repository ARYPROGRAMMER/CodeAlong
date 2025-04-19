import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);

  const call = useCall();

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="md:col-span-1 p-6 flex flex-col shadow-lg border-opacity-50 hover:border-primary/30 transition-all duration-300">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mb-2 font-comfortaa">
                Camera Preview
              </h1>
              <p className="text-sm text-muted-foreground">
                Make sure you look decent!
              </p>
            </div>

            <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/20 border border-muted/30 relative shadow-inner">
              <div className="absolute inset-0">
                <VideoPreview className="h-full w-full" />
              </div>
            </div>
          </Card>

          <Card className="md:col-span-1 p-6 shadow-lg border-opacity-50 hover:border-primary/30 transition-all duration-300">
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2 font-comfortaa">
                  Meeting Details
                </h2>
                <p className="text-sm text-muted-foreground break-all bg-muted/20 p-2 rounded-md">
                  {call.id}
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6 mt-8">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
                        <CameraIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium font-comfortaa">Camera</p>
                        <p className="text-sm text-muted-foreground">
                          {isCameraDisabled ? "Off" : "On"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isCameraDisabled}
                      onCheckedChange={(checked) =>
                        setIsCameraDisabled(!checked)
                      }
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
                        <MicIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium font-comfortaa">Microphone</p>
                        <p className="text-sm text-muted-foreground">
                          {isMicDisabled ? "Off" : "On"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isMicDisabled}
                      onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
                        <SettingsIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium font-comfortaa">Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Configure devices
                        </p>
                      </div>
                    </div>
                    <DeviceSettings />
                  </div>
                </div>

                <div className="space-y-3 mt-10">
                  <Button
                    className="w-full font-comfortaa font-medium tracking-wide shadow-md hover:shadow-lg transition-all"
                    size="lg"
                    onClick={handleJoin}
                  >
                    Join Meeting
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Do not worry, I am super friendly!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default MeetingSetup;
