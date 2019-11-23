--To make a bot user go to https://discordapp.com/developers/applications/me 
-- Click "+ New user"
-- Add imgs to the rich presence assets area 
-- Copy and paste the client user id

Citizen.CreatThread(function()
    while true do
        local player = GetPlayerPed(-1)
        Citizen.Wait(2*1000)
        
        SetDiscordAppId(DiscordBotUserId)
        -- Hunter is on paleto blvd
        SetRichPresence(GetPlayerName(source) .. " is on".. GetStreetNameFromHashKey(GetStreetNameAtCoord(tabel.unpack(GetEntityCoords(player)))))
    -- You need to make your own rpc assets/imgs
        SetDiscordRichPresenceAsset("Discord-asset-name-here")
        SetDiscordRichPresenceAssetText(GetPlayerName(source))
        -- You need to make your own rpc assets/imgs
        SetDiscordRichPresenceAssetSmall("Discord-asset-name-here")
        SetDiscordRichPresenceAssetSmallText("Health: ".. (GetEntityHeath(player) - 100) )

    end
end)