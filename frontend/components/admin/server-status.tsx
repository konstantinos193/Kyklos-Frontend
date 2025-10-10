"use client";

import { useState, useEffect } from 'react';
import { Server, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ServerStatusData {
  status: 'online' | 'offline' | 'maintenance';
  uptime: string;
  responseTime: number;
  lastChecked: string;
}

export function ServerStatus() {
  const [serverStatus, setServerStatus] = useState<ServerStatusData>({
    status: 'online',
    uptime: '99.9%',
    responseTime: 120,
    lastChecked: new Date().toLocaleTimeString('el-GR')
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        setIsLoading(true);
        const startTime = Date.now();
        
        // Simulate API call
        const response = await fetch('/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const responseTime = Date.now() - startTime;
        
        if (response.ok) {
          setServerStatus({
            status: 'online',
            uptime: '99.9%',
            responseTime: responseTime,
            lastChecked: new Date().toLocaleTimeString('el-GR')
          });
        } else {
          setServerStatus({
            status: 'offline',
            uptime: '0%',
            responseTime: responseTime,
            lastChecked: new Date().toLocaleTimeString('el-GR')
          });
        }
      } catch (error) {
        setServerStatus({
          status: 'offline',
          uptime: '0%',
          responseTime: 0,
          lastChecked: new Date().toLocaleTimeString('el-GR')
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkServerStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    if (isLoading) {
      return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
    
    switch (serverStatus.status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'maintenance':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    if (isLoading) return 'Έλεγχος...';
    
    switch (serverStatus.status) {
      case 'online':
        return 'Συνδεδεμένος';
      case 'offline':
        return 'Αποσυνδεδεμένος';
      case 'maintenance':
        return 'Συντήρηση';
      default:
        return 'Άγνωστο';
    }
  };

  const getStatusColor = () => {
    if (isLoading) return 'text-yellow-600';
    
    switch (serverStatus.status) {
      case 'online':
        return 'text-green-600';
      case 'offline':
        return 'text-red-600';
      case 'maintenance':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Κατάσταση Server</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Κατάσταση</span>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Uptime</span>
          <span className="text-sm font-medium text-gray-900">
            {serverStatus.uptime}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Χρόνος Απάντησης</span>
          <span className="text-sm font-medium text-gray-900">
            {serverStatus.responseTime}ms
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Τελευταίος Έλεγχος</span>
          <span className="text-sm font-medium text-gray-900">
            {serverStatus.lastChecked}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Αυτόματος έλεγχος κάθε 30s</span>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${
              serverStatus.status === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}
