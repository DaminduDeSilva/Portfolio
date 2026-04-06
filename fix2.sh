sed -i 's/{ id: AppId; icon: React.ReactNode; label: string }/{ id: AppId; icon: React.ReactElement; label: string }/g' src/components/desktop/Taskbar.tsx
