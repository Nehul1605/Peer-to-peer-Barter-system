import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

export default function MeetingRoom() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const apiRef = useRef<any>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // 60 minutes in milliseconds
  const SESSION_DURATION = 60 * 60 * 1000; 

  useEffect(() => {
    const fetchSessionAndToken = async () => {
      try {
        const response = await api.get(`/sessions`); // In real app, fetch single session: /sessions/${sessionId}
        const foundSession = response.data.data.find((s: any) => s.id === sessionId);
        
        if (foundSession) {
           setSession(foundSession);
           
           // Set default room name
           let finalRoomName = `SkillBarter-${sessionId}`;
           
           // Try to get JaaS token if configured
           try {
             const tokenRes = await api.get(`/sessions/${sessionId}/token`);
             if (tokenRes.data.data.token) {
                setJwtToken(tokenRes.data.data.token);
                // Backend might return the required room name (though usually it's consistent)
                if (tokenRes.data.data.roomName) {
                    finalRoomName = tokenRes.data.data.roomName;
                }
             }
           } catch (e) {
             console.log("Using public server (no token)");
           }
           
           setRoomName(finalRoomName);
           
        } else {
           toast.error("Session not found");
           navigate('/dashboard/sessions');
        }
      } catch (error) {
        toast.error("Failed to load session");
        navigate('/dashboard/sessions');
      } finally {
        setLoading(false);
      }
    };
    fetchSessionAndToken();
  }, [sessionId, navigate]);

  const handleApiReady = (externalApi: any) => {
    apiRef.current = externalApi;
    
    externalApi.on('videoConferenceJoined', () => {
        startTimeRef.current = Date.now();
        console.log("Meeting joined, timer started");
        
        // Start 60 minute timer
        setTimeout(() => {
            toast.info("Session time is up! Redirecting to review...");
            handleMeetingEnd();
        }, SESSION_DURATION);

        // Provide warning at 55 minutes
        setTimeout(() => {
            toast.warning("5 minutes remaining in session.");
        }, SESSION_DURATION - (5 * 60 * 1000));
    });

    // Listen for hangup
    externalApi.on('videoConferenceLeft', () => {
        handleMeetingEnd();
    });
  };

  const handleMeetingEnd = async () => {
      let durationMinutes = 0;
      if (startTimeRef.current) {
          const durationMs = Date.now() - startTimeRef.current;
          durationMinutes = Math.ceil(durationMs / (1000 * 60));
      }
      
      if (apiRef.current) {
          apiRef.current.dispose();
      }
      
      // Navigate to review page with actual duration
      navigate(`/dashboard/session/${sessionId}/review?duration=${durationMinutes}`);
  };

  if (loading || !user) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
       <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center">
            <div>
                 <h2 className="text-lg font-bold">Session: {session?.topic}</h2>
                 <p className="text-sm text-neutral-400">Time Limit: 60 Minutes</p>
            </div>
            <button 
                onClick={handleMeetingEnd}
                className="px-4 py-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
            >
                End Session
            </button>
       </div>
       <div className="flex-1 overflow-hidden relative">
        <JitsiMeeting
            domain={jwtToken ? "8x8.vc" : "meet.jit.si"} 
            roomName={roomName}
            jwt={jwtToken || undefined}
            configOverwrite={{
                startWithAudioMuted: true,
                disableThirdPartyRequests: true,
                prejoinPageEnabled: false,
            }}
            interfaceConfigOverwrite={{
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'security'
                ],
            }}
            userInfo={{
                displayName: user.name || 'User'
            }}
            onApiReady={handleApiReady}
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
        />
       </div>
    </div>
  );
}
