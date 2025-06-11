<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  // Using direct imports for Card sub-components as per previous patterns
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
  import { diveLogEntries } from '$lib/stores/diveLogStore';
  import { awardedBadges } from '$lib/stores/userProfileStore';
  import { Download, UploadCloud } from 'lucide-svelte';
  import { get } from 'svelte/store';

  let importMessage = '';
  let importMessageType: 'success' | 'error' | '' = '';

  function exportData() {
    const currentDiveLog = get(diveLogEntries);
    const currentBadges = get(awardedBadges);

    const dataToExport = {
      aquadexVersion: '1.0.0', // Semantic versioning
      exportDate: new Date().toISOString(),
      diveLog: currentDiveLog,
      awardedBadges: currentBadges
      // Future: userPreferences, etc.
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    link.download = `aquadex_backup_${timestamp}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

    // Optional: Add a user feedback message (e.g., using a toast notification store later)
    alert('Data export initiated! Check your downloads.');
  }

  // Implemented handleFileUpload function
  async function handleFileUpload(event: Event) {
    importMessage = '';
    importMessageType = '';
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      importMessage = 'No file selected.';
      importMessageType = 'error';
      return;
    }

    if (file.type !== 'application/json') {
      importMessage = 'Invalid file type. Please select a JSON file.';
      importMessageType = 'error';
      target.value = ''; // Clear the input
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedRaw = JSON.parse(reader.result as string);

        // Basic validation
        if (!importedRaw || typeof importedRaw !== 'object' || !('diveLog' in importedRaw) || !('awardedBadges' in importedRaw)) {
          throw new Error('Invalid Aquadex backup file structure. Required fields: diveLog, awardedBadges.');
        }
        // Further validation for array types and potentially item structure
        if (!Array.isArray(importedRaw.diveLog) || !Array.isArray(importedRaw.awardedBadges)) {
          throw new Error('Data format error: diveLog and awardedBadges must be arrays.');
        }
        // Add more specific item validation if necessary, e.g. check for id, speciesId in diveLog items

        if (confirm('Are you sure you want to import this data? This will overwrite ALL current Aquadex data (dive logs and badges). This action cannot be undone.')) {
          diveLogEntries.set(importedRaw.diveLog);
          awardedBadges.set(importedRaw.awardedBadges);

          importMessage = 'Data imported successfully! The page will now reload to reflect changes.';
          importMessageType = 'success';

          setTimeout(() => { window.location.reload(); }, 2500); // Increased timeout slightly
        } else {
          importMessage = 'Import cancelled by user.';
          importMessageType = ''; // Neutral message
        }
      } catch (err) {
        console.error('Import error:', err);
        importMessage = err instanceof Error ? err.message : 'Failed to parse or validate the backup file.';
        importMessageType = 'error';
      }
      target.value = ''; // Clear the input after processing
    };
    reader.onerror = () => {
      importMessage = 'Error reading file.';
      importMessageType = 'error';
      target.value = ''; // Clear the input
    };
    reader.readAsText(file);
  }
</script>

<div class="container mx-auto p-4 md:p-8 max-w-3xl"> {/* Increased max-width slightly */}
  <h1 class="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">Settings</h1>

  <Card class="shadow-lg">
    <CardHeader>
      <CardTitle class="text-2xl">Data Management</CardTitle>
      <CardDescription>Export or import your Aquadex data. Keep your observations safe!</CardDescription>
    </CardHeader>
    <CardContent class="space-y-8 pt-2"> {/* Added more spacing and adjusted top padding */}

      <!-- Export Section -->
      <div class="p-4 border border-border rounded-lg bg-background/50">
        <h3 class="text-xl font-semibold text-primary mb-2">Export Data</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Download all your dive log entries and awarded badges as a single JSON file.
          This is useful for creating personal backups or if you plan to transfer your data to another device or browser.
        </p>
        <Button on:click={exportData} variant="secondary">
          <Download class="mr-2 h-5 w-5" />
          Export My Data
        </Button>
      </div>

      <!-- Import Section -->
      <div class="p-4 border border-border rounded-lg bg-background/50">
        <h3 class="text-xl font-semibold text-primary mb-2">Import Data</h3>
        <p class="text-sm text-muted-foreground mb-3">
          Restore your Aquadex data from a previously exported JSON backup file.
        </p>
        <p class="text-sm font-semibold text-destructive mb-4">
          Warning: This will overwrite ALL existing data (dive logs and badges). This action cannot be undone.
        </p>

        <input
          type="file"
          id="importFile"
          accept=".json"
          on:change={handleFileUpload}
          class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
        />

        {#if importMessage}
          <p class="text-sm mt-3 {importMessageType === 'success' ? 'text-green-600' : importMessageType === 'error' ? 'text-destructive' : 'text-muted-foreground'}">
            {importMessage}
          </p>
        {/if}
      </div>

    </CardContent>
  </Card>
</div>
