import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function Sessions() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        try {
            const response = await api.get('/sessions');
            if (response.data.success) {
                setSessions(response.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleStatusUpdate = async (sessionId: string, status: string) => {
        try {
            const res = await api.put(`/sessions/${sessionId}`, { status });
            if (res.data.success) {
                toast.success(`Session ${status.toLowerCase()}`);
                fetchSessions();
            }
        } catch (error: any) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">My Sessions</h1>
            {loading ? <p>Loading...</p> : (
                <div className="grid gap-4">
                    {sessions.map((session: any) => (
                        <Card key={session.id} className="p-6 bg-neutral-900/40 border-neutral-800">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">{session.topic}</h3>
                                    <p className="text-neutral-400 text-sm mb-4">
                                        {session.teacherId === user?.id 
                                            ? `Teaching: ${session.learner?.name}`
                                            : `Instructor: ${session.teacher?.name}`}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge>{session.status}</Badge>
                                        <span className="text-sm text-neutral-500">
                                            {new Date(session.scheduledAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {session.meetingLink && session.status === 'SCHEDULED' && (
                                        <div className="mt-2 text-sm bg-neutral-800 p-2 rounded">
                                            <p className="text-neutral-400 mb-1">Meeting Ready:</p>
                                            <Link 
                                                to={`/dashboard/session/${session.id}/room`}
                                                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors w-full"
                                            >
                                                Enter Meeting Room
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div className="space-x-2">
                                    {session.status === 'PENDING' && session.teacherId === user?.id && (
                                        <>
                                            <Button size="sm" onClick={() => handleStatusUpdate(session.id, 'SCHEDULED')}>Accept</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleStatusUpdate(session.id, 'CANCELLED')}>Decline</Button>
                                        </>
                                    )}
                                    {session.status === 'SCHEDULED' && (
                                        <Button size="sm" onClick={() => handleStatusUpdate(session.id, 'COMPLETED')}>Mark Complete</Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                    {sessions.length === 0 && <p>No sessions found.</p>}
                </div>
            )}
        </div>
    );
}
