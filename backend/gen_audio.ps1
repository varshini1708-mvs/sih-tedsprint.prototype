Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SetOutputToWaveFile("c:\Users\Hp\Desktop\sih tedsprint prototype\backend\test_speech.wav")
$synth.Speak("This is a handmade basket made up of bamboo.")
$synth.Dispose()
Write-Host "Audio generated successfully."
