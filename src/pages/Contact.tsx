import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Mail, Send, MessageSquare, User } from "lucide-react";
import * as THREE from 'three';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const torusRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1, 
      emissive: 0x2a2a72,
      shininess: 100,
      specular: 0xffffff
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    torusRef.current = torus;

    const animate = () => {
      requestAnimationFrame(animate);
      if (torusRef.current) {
        torusRef.current.rotation.x += 0.01;
        torusRef.current.rotation.y += 0.005;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (torusRef.current) {
        torusRef.current.geometry.dispose();
        if (torusRef.current.material instanceof THREE.Material) {
          torusRef.current.material.dispose();
        } else if (Array.isArray(torusRef.current.material)) {
          torusRef.current.material.forEach(material => material.dispose());
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      });
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                <p className="text-muted-foreground">
                  Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your name"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your email"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[150px] w-full bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                      placeholder="Enter your message"
                      required
                    />
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending message..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="md:w-1/2 flex flex-col space-y-8">
              <div 
                ref={mountRef} 
                className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden"
              ></div>
              
              <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-bold">Connect With Us</h2>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@myanime.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Social Media</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-primary hover:text-primary/80">Twitter</a>
                      <a href="#" className="text-primary hover:text-primary/80">Instagram</a>
                      <a href="#" className="text-primary hover:text-primary/80">Discord</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
