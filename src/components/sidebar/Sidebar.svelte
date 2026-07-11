<script>
  import SidebarFolderItem from './SidebarFolderItem.svelte';
  import SidebarFolderList from './SidebarFolderList.svelte';

  let entries = [
    {
      "name": "My Files",
      "path": "/",
      "type": "directory",
      "subdirs": []
    }
  ];

  let selectedFolder = $state('/');
</script>

<!--

  Entries 
  
  TODO: dont't hardcode these. right now they're just for
        us to ensure the style is correct, but in the
        future we'll need to actually fill this out using
        API_GetTree(); whenever it's implemented.

  Problems we'll need to figure out:
    - Whenever a folder name is more than X characters, truncate the
      last 3 characters that'll be visible into `...`, e.g:
      `VeryLongFolderName` -> `VeryLo...`
      (also we'll need to account for nesting)
    - Only one folder in the parent dir can be opened, e.g:
      let's say we have `MyFiles/{ChromeOS,isos}/{shims,windows}`,
      we would be able to tree view `MyFiles/ChromeOS/shims` but
      if we were to try and do a tree view on `MyFiles/isos/` it
      would automatically close that old ChromeOS tree and open
      the isos tree. When the isos tree is open we can open the
      windows tree just fine without the isos tree closing. 
-->
<div>
  <SidebarFolderList class="overflow-x-hidden">
    <SidebarFolderItem
      isFirstEntry="true"
      isOpen="true"
      hasSubdirs="true"
      folderName="My Files"
      folderType="directory"
      selected={selectedFolder == '/'}
      onSelect={() => selectedFolder = '/'}
    >
      <SidebarFolderList>
        <SidebarFolderItem
          depth="1"
          isOpen="true"
          hasSubdirs="true"
          folderName="ChromeOS"
          folderType="directory"
          selected={selectedFolder == '/ChromeOS'}
          onSelect={() => selectedFolder = '/ChromeOS'}
        >
          <SidebarFolderList>
            <SidebarFolderItem
              depth="2"
              folderName="GSC"
              folderType="directory"
              selected={selectedFolder == '/ChromeOS/GSC'}
              onSelect={() => selectedFolder = '/ChromeOS/GSC'}
            />
            <SidebarFolderItem
              depth="2"
              folderName="shims"
              folderType="directory"
              selected={selectedFolder == '/ChromeOS/shims'}
              onSelect={() => selectedFolder = '/ChromeOS/shims'}
            />
          </SidebarFolderList>
        </SidebarFolderItem>
        <SidebarFolderItem
          depth="1"
          folderName="isos"
          folderType="directory"
          selected={selectedFolder == '/isos'}
          onSelect={() => selectedFolder = '/isos'}
        />
      </SidebarFolderList>
    </SidebarFolderItem>
  </SidebarFolderList>
</div>
