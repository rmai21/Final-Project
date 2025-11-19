// Combined themed username list (book-nerd + dark academia vibes)
export const RANDOM_USERNAMES = [
  "QuillScribe",
  "LiteraryLumos",
  "PageTurner42",
  "InkwellDreamer",
  "NovelNomad",
  "BindingWhisper",
  "ShelfGoblin",
  "QuirkedQuill",
  "TheLastBookmark",
  "PlotTwistMage",
  "AtlasPagefinder",
  "BookmarkBandit",
  "FictionFamiliar",
  "ChapterChaser",
  "StoryboundSoul",
  "PenAndParchment",
  "AnnotatedMind",
  "QuietBookDragon",
  "MorbidScholar",
  "VelvetPhilosopher",
  "NocturnalArchivist",
  "AshenLibrary",
  "SepiaInkling",
  "LanternOfAporia",
  "RavenQuill",
  "ArcanumReader",
  "ObscuraDialectic",
  "ThePaleEssayist",
  "CandlelitScribe",
  "UmbralMuse",
  "ByronicBones",
  "AstralOxonian",
  "NightshadeLectern",
  "DeadLanguageDevotee",
  "MarbleStatueMind",
  "GothicEphemera"
]

export function generateRandomUsername() {
  // choose random item + small random suffix sometimes for uniqueness
  const name = RANDOM_USERNAMES[Math.floor(Math.random() * RANDOM_USERNAMES.length)]
  if (Math.random() < 0.4) {
    return `${name}${Math.floor(Math.random() * 99)}`
  }
  return name
}
