interface AnimeData {
  attributes: {
    ageRatingGuide: string
    averageRating: string
    canonicalTitle: string
    coverImage: {
      large: string
      original: string
      small: string
      tiny: string
    }
    createdAt: Date
    description: string
    endDate: string
    episodeCount: number
    episodeLength: number
    favoritesCount: number
    popularityRank: number
    posterImage: {
      large: string
      medium: string
      original: string
      small: string
      tiny: string
    }
    startDate: string
    status: string
    synopsis: string
    titles: {
      en: string
      ja_jp: string
    }
    youtubeVideoId: string
  }
  id: string
  links: {
    self: string
  }
  relationships: {
    animeCharacters: {
      links: {
        self: string
        related: string
      }
    }
    animeProductions: {
      links: {
        self: string
        related: string
      }
    }
    animeStaff: {
      links: {
        self: string
        related: string
      }
    }
    castings: {
      links: {
        self: string
        related: string
      }
    }
    categories: {
      links: {
        self: string
        related: string
      }
    }
    characters: {
      links: {
        self: string
        related: string
      }
    }
    episodes: {
      links: {
        self: string
        related: string
      }
    }
    genres: {
      links: {
        self: string
        related: string
      }
    }
    installments: {
      links: {
        self: string
        related: string
      }
    }
    mappings: {
      links: {
        self: string
        related: string
      }
    }
    mediaRelationships: {
      links: {
        self: string
        related: string
      }
    }
    productions: {
      links: {
        self: string
        related: string
      }
    }
    quotes: {
      links: {
        self: string
        related: string
      }
    }
    reviews: {
      links: {
        self: string
        related: string
      }
    }
    staff: {
      links: {
        self: string
        related: string
      }
    }
    streamingLinks: {
      links: {
        self: string
        related: string
      }
    }
  }
  type: string
}